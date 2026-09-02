import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { heritageData } from '@/data/heritageData';

interface HeritageEvolutionProps {
  stateName: string;
}

export function HeritageEvolution({ stateName }: HeritageEvolutionProps) {
  const data = heritageData[stateName];
  if (!data || data.evolution.length === 0) return null;

  return (
    <div className="mt-12">
      {/* Section header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-500/10 px-4 py-2 text-sm font-medium text-gold-400">
          <Sparkles className="h-4 w-4" />
          Heritage Evolution
        </div>
        <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
          Past Meets Present in {stateName}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400 sm:text-base">
          See how {stateName}'s ancestral traditions have evolved into modern expressions —
          a visual comparison of then and now.
        </p>
      </div>

      {/* Evolution comparisons */}
      <div className="space-y-8">
        {data.evolution.map((evo, idx) => (
          <div
            key={idx}
            className="animate-fade-in-up overflow-hidden rounded-3xl border border-white/10 bg-ink-800/40 backdrop-blur-sm"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            {/* Theme label */}
            <div className="border-b border-white/10 px-6 py-3 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                {evo.theme}
              </span>
            </div>

            {/* Comparison grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Past */}
              <div className="group relative overflow-hidden p-1">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={evo.past.image}
                    alt={evo.past.title}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-saffron-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Then (Ancestral)</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-white">
                      {evo.past.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-300">{evo.past.description}</p>
                  </div>
                </div>
              </div>

              {/* Arrow divider (hidden on mobile) */}
              <div className="relative hidden items-center justify-center md:flex md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/30 bg-ink-900 shadow-xl">
                  <ArrowRight className="h-6 w-6 text-gold-400" />
                </div>
              </div>

              {/* Present */}
              <div className="group relative overflow-hidden p-1">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={evo.present.image}
                    alt={evo.present.title}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-emerald2-400">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Now (Modern)</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-white">
                      {evo.present.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-300">{evo.present.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
