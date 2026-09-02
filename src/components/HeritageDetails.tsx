import { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Sparkles, Info, Lightbulb } from 'lucide-react';
import type { HeritageCategory } from '@/types';
import { heritageData } from '@/data/heritageData';

interface HeritageDetailsProps {
  stateName: string;
  category: HeritageCategory;
  initialItemId?: string;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function HeritageDetails({
  stateName,
  category,
  initialItemId,
  onBack,
  isFavorite,
  onToggleFavorite,
}: HeritageDetailsProps) {
  const data = heritageData[stateName];
  const categoryItems = category === 'ancestral' ? data?.ancestral ?? [] : data?.modern ?? [];

  const initialIndex = initialItemId
    ? Math.max(0, categoryItems.findIndex((i) => i.id === initialItemId))
    : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const item = categoryItems[currentIndex];

  if (!item) return null;

  const isAncestral = category === 'ancestral';

  const goPrev = () => setCurrentIndex((i) => (i > 0 ? i - 1 : categoryItems.length - 1));
  const goNext = () => setCurrentIndex((i) => (i < categoryItems.length - 1 ? i + 1 : 0));

  return (
    <div className="animate-fade-in">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {stateName}
        </button>
        <span className={`text-xs font-semibold uppercase tracking-widest ${isAncestral ? 'text-saffron-400' : 'text-emerald2-400'}`}>
          {isAncestral ? 'Ancestral Heritage' : 'Modern Heritage'} &middot; {stateName}
        </span>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
            style={{ minHeight: '400px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

          {/* Favorite button on image */}
          <button
            onClick={onToggleFavorite}
            className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-all ${
              isFavorite
                ? 'bg-saffron-500/30 text-saffron-400 ring-2 ring-saffron-400/50'
                : 'bg-ink-950/40 text-white hover:bg-saffron-500/20 hover:text-saffron-400'
            }`}
            aria-label="Toggle favorite"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-saffron-400' : ''}`} />
          </button>

          {/* Navigation dots */}
          {categoryItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {categoryItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-saffron-400' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to item ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-col">
          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  isAncestral
                    ? 'border-saffron-400/30 bg-saffron-500/10 text-saffron-300'
                    : 'border-emerald2-400/30 bg-emerald2-500/10 text-emerald2-300'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {item.title}
          </h1>

          {/* Description */}
          <p className="mt-4 text-base text-gray-300">{item.description}</p>

          {/* Background */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2 text-saffron-400">
              <Info className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Historical Background</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.background}</p>
          </div>

          {/* Facts */}
          <div className="mt-6 rounded-2xl border border-gold-400/20 bg-gold-500/5 p-5">
            <div className="flex items-center gap-2 text-gold-400">
              <Lightbulb className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Interesting Facts</span>
            </div>
            <ul className="mt-3 space-y-2">
              {item.facts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                  <Sparkles className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isAncestral ? 'text-saffron-400' : 'text-emerald2-400'}`} />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* Item navigation */}
          {categoryItems.length > 1 && (
            <div className="mt-auto flex items-center justify-between gap-4 pt-6">
              <button
                onClick={goPrev}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="text-xs text-gray-500">
                {currentIndex + 1} / {categoryItems.length}
              </span>
              <button
                onClick={goNext}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
