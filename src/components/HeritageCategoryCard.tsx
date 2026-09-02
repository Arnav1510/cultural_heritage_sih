import { Building2, Sparkles, ArrowRight } from 'lucide-react';
import type { HeritageCategory } from '@/types';

interface HeritageCategoryCardProps {
  category: HeritageCategory;
  stateName: string;
  itemCount: number;
  onSelect: () => void;
  delay?: number;
}

export function HeritageCategoryCard({
  category,
  stateName,
  itemCount,
  onSelect,
  delay = 0,
}: HeritageCategoryCardProps) {
  const isAncestral = category === 'ancestral';

  return (
    <button
      onClick={onSelect}
      className="group animate-fade-in-up relative w-full overflow-hidden rounded-3xl border border-white/10 p-8 text-left transition-all duration-500 hover:border-white/20 hover:shadow-2xl"
      style={{
        animationDelay: `${delay}s`,
        background: isAncestral
          ? 'linear-gradient(135deg, rgba(217,119,6,0.12), rgba(120,53,15,0.08))'
          : 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,95,70,0.08))',
      }}
    >
      {/* Decorative blob */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background: isAncestral ? '#f97316' : '#10b981',
        }}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
            isAncestral
              ? 'bg-gradient-to-br from-saffron-500 to-gold-600 text-ink-950'
              : 'bg-gradient-to-br from-emerald2-400 to-emerald2-600 text-ink-950'
          }`}
        >
          {isAncestral ? <Building2 className="h-7 w-7" strokeWidth={2} /> : <Sparkles className="h-7 w-7" strokeWidth={2} />}
        </div>

        {/* Label */}
        <span className={`text-xs font-semibold uppercase tracking-widest ${
          isAncestral ? 'text-saffron-400' : 'text-emerald2-400'
        }`}>
          {isAncestral ? 'Ancestral Heritage' : 'Modern Heritage'}
        </span>

        <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
          {isAncestral ? 'Past' : 'Present'}
        </h3>

        <p className="mt-3 text-sm text-gray-300">
          {isAncestral
            ? `Discover the ancient traditions, monuments, folk arts, and customs that shaped ${stateName}'s identity over centuries.`
            : `Explore how ${stateName}'s culture has evolved — contemporary art, modern architecture, technology, and festivals of today.`}
        </p>

        {/* Count + action */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-gray-400">{itemCount} heritage items</span>
          <span className={`flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5 ${
            isAncestral ? 'text-saffron-400' : 'text-emerald2-400'
          }`}>
            Explore
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </button>
  );
}
