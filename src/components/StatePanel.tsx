import { X, MapPin, Heart, Shuffle, ArrowRight, Clock } from 'lucide-react';
import { heritageData } from '@/data/heritageData';
import { HeritageCategoryCard } from './HeritageCategoryCard';
import type { HeritageCategory } from '@/types';

interface StatePanelProps {
  stateName: string;
  onClose: () => void;
  onSelectCategory: (category: HeritageCategory) => void;
  onSurprise: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function StatePanel({
  stateName,
  onClose,
  onSelectCategory,
  onSurprise,
  isFavorite,
  onToggleFavorite,
}: StatePanelProps) {
  const data = heritageData[stateName];

  if (!data) {
    return (
      <div className="animate-slide-in-right mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800/60 to-ink-900/80 backdrop-blur-xl">
        {/* Header */}
        <div className="relative border-b border-white/10 p-6 sm:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), transparent 60%)' }}
          />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-saffron-400">
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-widest">State Selected</span>
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                {stateName}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:text-white"
              aria-label="Close panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Coming soon message */}
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-saffron-400/20 bg-saffron-500/10 text-saffron-400">
            <Clock className="h-8 w-8" />
          </div>
          <h3 className="mt-6 font-display text-xl font-semibold text-white">
            Heritage content coming soon
          </h3>
          <p className="mt-2 max-w-md text-sm text-gray-400">
            We're working on gathering the rich cultural and historical heritage of {stateName}.
            Check back soon to explore its traditions, monuments, and stories.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-in-right mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800/60 to-ink-900/80 backdrop-blur-xl">
      {/* Header */}
      <div className="relative border-b border-white/10 p-6 sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), transparent 60%)' }}
        />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-saffron-400">
              <MapPin className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-widest">State Selected</span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              {data.state}
            </h2>
            <p className="mt-1 text-sm text-gray-400">Capital: {data.capital}</p>
            <p className="mt-3 max-w-xl text-sm text-gray-300 sm:text-base">{data.blurb}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={onToggleFavorite}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                isFavorite
                  ? 'border-saffron-400/40 bg-saffron-500/15 text-saffron-400'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:text-saffron-400'
              }`}
              aria-label="Toggle favorite"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-saffron-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:text-white"
              aria-label="Close panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category cards */}
      <div className="p-6 sm:p-8">
        <h3 className="mb-4 font-display text-lg font-semibold text-white">
          Choose a Heritage Category
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <HeritageCategoryCard
            category="ancestral"
            stateName={data.state}
            itemCount={data.ancestral.length}
            onSelect={() => onSelectCategory('ancestral')}
            delay={0}
          />
          <HeritageCategoryCard
            category="modern"
            stateName={data.state}
            itemCount={data.modern.length}
            onSelect={() => onSelectCategory('modern')}
            delay={0.1}
          />
        </div>

        {/* Surprise button */}
        <button
          onClick={onSurprise}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] py-4 text-sm font-medium text-gray-400 transition-all hover:border-saffron-400/30 hover:bg-saffron-500/5 hover:text-saffron-300"
        >
          <Shuffle className="h-4 w-4" />
          Surprise Me — Discover a random heritage item from {data.state}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
