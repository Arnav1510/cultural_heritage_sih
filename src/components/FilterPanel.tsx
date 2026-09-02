import { Check } from 'lucide-react';
import { filterOptions } from '@/data/heritageData';
import type { HeritageTag } from '@/types';
import {
  Building2, Wind, Music, UtensilsCrossed, Sparkles,
  Palette, Shirt, Landmark,
} from 'lucide-react';

interface FilterPanelProps {
  activeFilters: HeritageTag[];
  onToggleFilter: (tag: HeritageTag) => void;
  onClearFilters: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Wind, Music, UtensilsCrossed, Sparkles, Palette, Shirt, Landmark,
};

export function FilterPanel({ activeFilters, onToggleFilter, onClearFilters }: FilterPanelProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Filters:</span>
      {filterOptions.map((option) => {
        const isActive = activeFilters.includes(option.value);
        const Icon = iconMap[option.icon] || Sparkles;

        return (
          <button
            key={option.value}
            onClick={() => onToggleFilter(option.value)}
            className={`group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
              isActive
                ? 'border-saffron-400/40 bg-saffron-500/15 text-saffron-300'
                : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {option.label}
            {isActive && <Check className="h-3 w-3" />}
          </button>
        );
      })}
      {activeFilters.length > 0 && (
        <button
          onClick={onClearFilters}
          className="rounded-full px-3 py-1.5 text-xs font-medium text-gray-400 underline-offset-2 hover:text-saffron-400 hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
