import { MapPin, ArrowDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
}

export function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background mesh + decorative elements */}
      <div className="absolute inset-0 mesh-bg" />
      <div
        className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #f97316, transparent 70%)' }}
      />
      <div
        className="absolute -left-20 bottom-0 h-[500px] w-[500px] rounded-full opacity-15 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)' }}
      />

      {/* Mandala decoration */}
      <div className="pointer-events-none absolute -right-32 top-1/2 hidden -translate-y-1/2 opacity-[0.07] lg:block">
        <svg width="500" height="500" viewBox="0 0 200 200" className="mandala-spin">
          <g fill="none" stroke="#fcd34d" strokeWidth="0.3">
            {[20, 40, 60, 80, 95].map((r) => (
              <circle key={r} cx="100" cy="100" r={r} />
            ))}
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + 95 * Math.cos((i * Math.PI) / 12)}
                y2={100 + 95 * Math.sin((i * Math.PI) / 12)}
              />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <path
                key={i}
                d={`M100,${100 - 60} Q${100 + 30 * Math.cos((i * Math.PI) / 6 + Math.PI / 12)},${100 - 60 * Math.sin((i * Math.PI) / 6 + Math.PI / 12)} 100,${100 - 40}`}
                transform={`rotate(${i * 30} 100 100)`}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-saffron-400/20 bg-saffron-500/10 px-4 py-2 text-sm font-medium text-saffron-300">
            <Sparkles className="h-4 w-4" />
            Interactive Cultural Discovery Platform
          </div>

          <h1 className="animate-fade-in-up font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl" style={{ animationDelay: '0.1s' }}>
            Discover India's Heritage,
            <span className="block text-gradient-saffron">Past and Present.</span>
          </h1>

          <p className="animate-fade-in-up mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl" style={{ animationDelay: '0.2s' }}>
            Explore the rich ancestral traditions and evolving modern cultural identity
            of India through an interactive digital experience.
          </p>

          <div className="animate-fade-in-up mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" style={{ animationDelay: '0.3s' }}>
            <button onClick={onExplore} className="btn-primary group text-base">
              <MapPin className="h-5 w-5 transition-transform group-hover:rotate-12" />
              Explore India's Heritage
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </button>
            <p className="text-sm text-gray-400">
              10 states &middot; 50+ heritage items &middot; Past meets present
            </p>
          </div>

          {/* Stat highlights */}
          <div className="animate-fade-in-up mt-16 grid grid-cols-3 gap-6" style={{ animationDelay: '0.4s' }}>
            {[
              { num: '10', label: 'States Featured' },
              { num: '50+', label: 'Heritage Items' },
              { num: '2', label: 'Eras Compared' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-4 py-4 text-center">
                <div className="font-display text-2xl font-bold text-gradient-gold sm:text-3xl">{stat.num}</div>
                <div className="mt-1 text-xs text-gray-400 sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
