import { useState, useEffect, useCallback, useRef } from 'react';
import { Shuffle, Brain, Sparkles, Info } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { IndiaMap } from '@/components/IndiaMap';
import { StatePanel } from '@/components/StatePanel';
import { HeritageDetails } from '@/components/HeritageDetails';
import { HeritageEvolution } from '@/components/HeritageEvolution';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { HeritageLibrary } from '@/components/HeritageLibrary';
import { Quiz } from '@/components/Quiz';
import { Footer } from '@/components/Footer';
import { FavoritesModal } from '@/components/FavoritesModal';
import { heritageData, stateList, quizData } from '@/data/heritageData';
import type { HeritageCategory, HeritageTag } from '@/types';

interface FavoriteItem {
  state: string;
  itemId: string;
  title: string;
  image: string;
}

type View =
  | { mode: 'map' }
  | { mode: 'state'; state: string }
  | { mode: 'details'; state: string; category: HeritageCategory; itemId?: string };

const FAV_STORAGE_KEY = 'heritage-india-favorites';

function App() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [view, setView] = useState<View>({ mode: 'map' });
  const [activeFilters, setActiveFilters] = useState<HeritageTag[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const mapRef = useRef<HTMLDivElement>(null);
  const heritageRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAV_STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Track active section for navbar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'home' || id === 'map' || id === 'heritage' || id === 'about') {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' },
    );

    ['home', 'map', 'heritage', 'about'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleExplore = useCallback(() => {
    handleNavigate('map');
  }, [handleNavigate]);

  const handleSelectState = useCallback((state: string) => {
    setSelectedState(state);
    setView({ mode: 'state', state });
    // Scroll to map area to show panel
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const handleCloseStatePanel = useCallback(() => {
    setSelectedState(null);
    setView({ mode: 'map' });
  }, []);

  const handleSelectCategory = useCallback((category: HeritageCategory) => {
    if (view.mode === 'state') {
      setView({ mode: 'details', state: view.state, category });
      setTimeout(() => {
        mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [view]);

  const handleBackToState = useCallback(() => {
    if (view.mode === 'details') {
      setView({ mode: 'state', state: view.state });
    }
  }, [view]);

  const handleSurprise = useCallback(() => {
    const randomState = stateList[Math.floor(Math.random() * stateList.length)];
    const data = heritageData[randomState];
    const allItems = [
      ...data.ancestral.map((i) => ({ item: i, category: 'ancestral' as const })),
      ...data.modern.map((i) => ({ item: i, category: 'modern' as const })),
    ];
    const random = allItems[Math.floor(Math.random() * allItems.length)];
    setSelectedState(randomState);
    setView({ mode: 'details', state: randomState, category: random.category, itemId: random.item.id });
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const handleSurpriseFromState = useCallback(() => {
    if (view.mode !== 'state') return;
    const data = heritageData[view.state];
    if (!data) return;
    const allItems = [
      ...data.ancestral.map((i) => ({ item: i, category: 'ancestral' as const })),
      ...data.modern.map((i) => ({ item: i, category: 'modern' as const })),
    ];
    const random = allItems[Math.floor(Math.random() * allItems.length)];
    setView({ mode: 'details', state: view.state, category: random.category, itemId: random.item.id });
  }, [view]);

  const handleSelectFromLibrary = useCallback(
    (state: string, category: HeritageCategory, itemId: string) => {
      setSelectedState(state);
      setView({ mode: 'details', state, category, itemId });
      setTimeout(() => {
        mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    },
    [],
  );

  const handleSearchResult = useCallback((state: string) => {
    handleSelectState(state);
  }, [handleSelectState]);

  const handleToggleFilter = useCallback((tag: HeritageTag) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const handleClearFilters = useCallback(() => setActiveFilters([]), []);

  // Favorites management
  const getCurrentFavoriteInfo = useCallback((): FavoriteItem | null => {
    if (view.mode !== 'details') return null;
    const data = heritageData[view.state];
    if (!data) return null;
    const items = view.category === 'ancestral' ? data.ancestral : data.modern;
    const currentItem = items[currentItemId(items, view.itemId)];
    if (!currentItem) return null;
    return { state: view.state, itemId: currentItem.id, title: currentItem.title, image: currentItem.image };
  }, [view]);

  const isCurrentFavorite = useCallback(() => {
    const info = getCurrentFavoriteInfo();
    if (!info) return false;
    return favorites.some((f) => f.state === info.state && f.itemId === info.itemId);
  }, [getCurrentFavoriteInfo, favorites]);

  const handleToggleFavorite = useCallback(() => {
    const info = getCurrentFavoriteInfo();
    if (!info) return;
    setFavorites((prev) => {
      const exists = prev.some((f) => f.state === info.state && f.itemId === info.itemId);
      if (exists) {
        return prev.filter((f) => !(f.state === info.state && f.itemId === info.itemId));
      }
      return [...prev, info];
    });
  }, [getCurrentFavoriteInfo]);

  const handleRemoveFavorite = useCallback((state: string, itemId: string) => {
    setFavorites((prev) => prev.filter((f) => !(f.state === state && f.itemId === itemId)));
  }, []);

  const handleSelectFavorite = useCallback((state: string, itemId: string) => {
    const data = heritageData[state];
    if (!data) return;
    const isAncestral = data.ancestral.some((i) => i.id === itemId);
    const category: HeritageCategory = isAncestral ? 'ancestral' : 'modern';
    setFavoritesOpen(false);
    handleSelectFromLibrary(state, category, itemId);
  }, [handleSelectFromLibrary]);

  // State-level favorite (when viewing state panel, favorite the state itself by favoriting first item)
  const isStateFavorite = useCallback(() => {
    if (view.mode !== 'state') return false;
    return favorites.some((f) => f.state === view.state);
  }, [view, favorites]);

  const handleToggleStateFavorite = useCallback(() => {
    if (view.mode !== 'state') return;
    const data = heritageData[view.state];
    if (!data) return;
    const firstItem = data.ancestral[0];
    if (!firstItem) return;
    const info: FavoriteItem = { state: view.state, itemId: firstItem.id, title: firstItem.title, image: firstItem.image };
    setFavorites((prev) => {
      const exists = prev.some((f) => f.state === view.state);
      if (exists) {
        return prev.filter((f) => f.state !== view.state);
      }
      return [...prev, info];
    });
  }, [view]);

  return (
    <div className="min-h-screen bg-ink-950 text-gray-100">
      <Navbar
        onNavigate={handleNavigate}
        onOpenFavorites={() => setFavoritesOpen(true)}
        favoritesCount={favorites.length}
        activeSection={activeSection}
      />

      {/* Hero */}
      <HeroSection onExplore={handleExplore} />

      {/* Map section */}
      <section id="map" ref={mapRef} className="relative scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search + Filters */}
          <div className="mb-8 space-y-4">
            <SearchBar onResultClick={handleSearchResult} activeFilters={activeFilters} />
            <FilterPanel
              activeFilters={activeFilters}
              onToggleFilter={handleToggleFilter}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Map */}
          <IndiaMap selectedState={selectedState} onSelectState={handleSelectState} />

          {/* Dynamic content below map */}
          {view.mode === 'state' && (
            <StatePanel
              stateName={view.state}
              onClose={handleCloseStatePanel}
              onSelectCategory={handleSelectCategory}
              onSurprise={handleSurpriseFromState}
              isFavorite={isStateFavorite()}
              onToggleFavorite={handleToggleStateFavorite}
            />
          )}

          {view.mode === 'details' && (
            <>
              <HeritageDetails
                stateName={view.state}
                category={view.category}
                initialItemId={view.itemId}
                onBack={handleBackToState}
                isFavorite={isCurrentFavorite()}
                onToggleFavorite={handleToggleFavorite}
              />
              <HeritageEvolution stateName={view.state} />
            </>
          )}

          {/* Global surprise button when on map view */}
          {view.mode === 'map' && (
            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                onClick={handleSurprise}
                className="btn-primary group text-base"
              >
                <Shuffle className="h-5 w-5 transition-transform group-hover:rotate-180" />
                Surprise Me — Random Heritage Discovery
              </button>
              <p className="text-sm text-gray-500">
                Let fate choose a state and heritage item for you
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Heritage Library section */}
      <section id="heritage" ref={heritageRef} className="relative scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section intro */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-saffron-400/20 bg-saffron-500/10 px-4 py-2 text-sm font-medium text-saffron-300">
              <Sparkles className="h-4 w-4" />
              Browse All Heritage
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              The Heritage Library
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400 sm:text-base">
              Explore all ancestral and modern heritage items from across India.
              Use the filters above to find specific categories.
            </p>
          </div>

          <HeritageLibrary
            activeFilters={activeFilters}
            onSelectItem={handleSelectFromLibrary}
          />
        </div>
      </section>

      {/* Quiz section */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-500/10 px-4 py-2 text-sm font-medium text-gold-400">
              <Brain className="h-4 w-4" />
              Test Your Knowledge
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              How Well Do You Know India's Heritage?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400 sm:text-base">
              {quizData.length} questions covering monuments, dance, festivals, and modern landmarks.
            </p>
          </div>
          <Quiz />
        </div>
      </section>

      {/* About section */}
      <section id="about" ref={aboutRef} className="relative scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald2-400/20 bg-emerald2-500/10 px-4 py-2 text-sm font-medium text-emerald2-300">
              <Info className="h-4 w-4" />
              About the Project
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              Student Innovation — India's Heritage
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: 'The Vision',
                description: 'Heritage India Explorer is a digital platform that makes India\'s 5,000-year-old cultural heritage accessible and engaging through interactive technology.',
                stat: '5,000+ years',
                statLabel: 'of civilization',
              },
              {
                title: 'Two Eras, One Story',
                description: 'We present both Ancestral Heritage — ancient traditions, monuments, and arts — and Modern Heritage — how culture evolves in contemporary India.',
                stat: 'Ancestral + Modern',
                statLabel: 'side by side',
              },
              {
                title: 'Built for Discovery',
                description: 'Interactive map, search, filters, comparison timelines, and a quiz — designed to make cultural exploration feel like an adventure.',
                stat: '10 states',
                statLabel: '50+ heritage items',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-ink-800/40 to-ink-900/60 p-6 backdrop-blur-sm transition-all hover:border-white/20"
              >
                <h3 className="font-display text-xl font-bold text-white">{card.title}</h3>
                <p className="mt-3 text-sm text-gray-400">{card.description}</p>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="font-display text-2xl font-bold text-gradient-gold">{card.stat}</div>
                  <div className="text-xs text-gray-500">{card.statLabel}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {['React', 'TypeScript', 'Tailwind CSS', 'D3-Geo', 'Interactive SVG Map'].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <button onClick={handleExplore} className="btn-primary">
              <Sparkles className="h-5 w-5" />
              Start Exploring
            </button>
          </div>
        </div>
      </section>

      <Footer onNavigate={handleNavigate} />

      {/* Favorites modal */}
      <FavoritesModal
        open={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favorites={favorites}
        onRemove={handleRemoveFavorite}
        onSelect={handleSelectFavorite}
      />
    </div>
  );
}

function currentItemId(items: { id: string }[], itemId?: string): number {
  if (!itemId) return 0;
  const idx = items.findIndex((i) => i.id === itemId);
  return idx >= 0 ? idx : 0;
}

export default App;
