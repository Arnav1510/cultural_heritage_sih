import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { heritageData, stateList } from '@/data/heritageData';
import type { HeritageTag } from '@/types';

interface SearchResult {
  state: string;
  title: string;
  category: 'ancestral' | 'modern';
  tags: HeritageTag[];
  type: 'state' | 'heritage';
}

interface SearchBarProps {
  onResultClick: (state: string) => void;
  activeFilters: HeritageTag[];
}

export function SearchBar({ onResultClick, activeFilters }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim() && activeFilters.length === 0) return [];

    const allResults: SearchResult[] = [];
    const q = query.toLowerCase().trim();

    stateList.forEach((stateName) => {
      const data = heritageData[stateName];

      // State name match
      const stateMatches = !q || stateName.toLowerCase().includes(q);
      if (stateMatches && q) {
        allResults.push({
          state: stateName,
          title: stateName,
          category: 'ancestral',
          tags: [],
          type: 'state',
        });
      }

      // Search heritage items
      [...data.ancestral.map((i) => ({ ...i, category: 'ancestral' as const })),
       ...data.modern.map((i) => ({ ...i, category: 'modern' as const }))]
        .forEach((item) => {
          const matchesQuery = !q ||
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.tags.some((t) => t.toLowerCase().includes(q));

          const matchesFilter = activeFilters.length === 0 ||
            item.tags.some((t) => activeFilters.includes(t));

          if (matchesQuery && matchesFilter) {
            allResults.push({
              state: stateName,
              title: item.title,
              category: item.category,
              tags: item.tags,
              type: 'heritage',
            });
          }
        });
    });

    return allResults.slice(0, 12);
  }, [query, activeFilters]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          placeholder="Search states, monuments, festivals, art forms..."
          className="w-full rounded-full border border-white/10 bg-white/5 py-3.5 pl-12 pr-12 text-sm text-white placeholder-gray-500 outline-none backdrop-blur-md transition-all focus:border-saffron-400/40 focus:bg-white/10"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setShowResults(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {showResults && results.length > 0 && (
        <div className="animate-fade-in absolute z-30 mt-2 max-h-96 w-full overflow-y-auto rounded-2xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl backdrop-blur-xl">
          {results.map((result, idx) => (
            <button
              key={`${result.state}-${idx}`}
              onClick={() => {
                onResultClick(result.state);
                setShowResults(false);
              }}
              className="flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/5"
            >
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                result.type === 'state' ? 'bg-saffron-500/15 text-saffron-400' : 'bg-emerald2-500/15 text-emerald2-400'
              }`}>
                {result.type === 'state' ? <MapPin className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{result.title}</p>
                <p className="truncate text-xs text-gray-400">
                  {result.state} &middot; {result.type === 'state' ? 'State' : result.category === 'ancestral' ? 'Ancestral Heritage' : 'Modern Heritage'}
                </p>
                {result.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {result.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults && query && results.length === 0 && activeFilters.length === 0 && (
        <div className="animate-fade-in absolute z-30 mt-2 w-full rounded-2xl border border-white/10 bg-ink-900/95 p-4 text-center text-sm text-gray-400 shadow-2xl backdrop-blur-xl">
          No results found. Try a different search term.
        </div>
      )}
    </div>
  );
}
