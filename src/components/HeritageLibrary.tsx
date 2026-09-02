import { useMemo } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { heritageData, stateList } from '@/data/heritageData';
import type { HeritageCategory, HeritageTag } from '@/types';

interface HeritageLibraryProps {
  activeFilters: HeritageTag[];
  onSelectItem: (state: string, category: HeritageCategory, itemId: string) => void;
}

interface FlatItem {
  state: string;
  category: HeritageCategory;
  itemId: string;
  title: string;
  description: string;
  image: string;
  tags: HeritageTag[];
}

export function HeritageLibrary({ activeFilters, onSelectItem }: HeritageLibraryProps) {
  const allItems = useMemo<FlatItem[]>(() => {
    const items: FlatItem[] = [];
    stateList.forEach((stateName) => {
      const data = heritageData[stateName];
      data.ancestral.forEach((item) => {
        items.push({
          state: stateName,
          category: 'ancestral',
          itemId: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          tags: item.tags,
        });
      });
      data.modern.forEach((item) => {
        items.push({
          state: stateName,
          category: 'modern',
          itemId: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          tags: item.tags,
        });
      });
    });
    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilters.length === 0) return allItems;
    return allItems.filter((item) =>
      item.tags.some((tag) => activeFilters.includes(tag)),
    );
  }, [allItems, activeFilters]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Heritage Library</h2>
          <p className="mt-1 text-sm text-gray-400">
            {filteredItems.length} of {allItems.length} heritage items
          </p>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-gray-400">No heritage items match the selected filters.</p>
          <p className="mt-1 text-sm text-gray-500">Try clearing some filters to see more.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, idx) => {
            const isAncestral = item.category === 'ancestral';
            return (
              <button
                key={`${item.state}-${item.itemId}`}
                onClick={() => onSelectItem(item.state, item.category, item.itemId)}
                className="group animate-fade-in-up overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition-all duration-300 hover:border-white/20 hover:shadow-xl"
                style={{ animationDelay: `${Math.min(idx * 0.05, 0.6)}s` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
                  <span
                    className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${
                      isAncestral
                        ? 'bg-saffron-500/20 text-saffron-300'
                        : 'bg-emerald2-500/20 text-emerald2-300'
                    }`}
                  >
                    {isAncestral ? 'Ancestral' : 'Modern'}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <MapPin className="h-3 w-3" />
                    {item.state}
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-gray-400">{item.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-saffron-400 opacity-0 transition-opacity group-hover:opacity-100">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
