import { Landmark, Github, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative border-t border-white/10 bg-ink-950/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-saffron-500 to-gold-500">
                <Landmark className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
              </div>
              <div>
                <span className="block font-display text-lg font-bold text-white">Heritage India</span>
                <span className="block text-xs tracking-widest text-saffron-400">EXPLORER</span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-gray-400">
              An interactive digital platform showcasing India's rich cultural heritage —
              from ancient ancestral traditions to the evolving modern cultural identity of
              a 5,000-year-old civilization.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="mt-4 space-y-2">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Interactive Map', id: 'map' },
                { label: 'Heritage Library', id: 'heritage' },
                { label: 'About', id: 'about' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-sm text-gray-400 transition-colors hover:text-saffron-400"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              About the Project
            </h4>
            <p className="mt-4 text-sm text-gray-400">
              A hackathon project celebrating Student Innovation — ideas that showcase the
              rich cultural heritage and traditions of India.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Heritage India Explorer. Built for innovation.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-gray-500">
            Made with <Heart className="h-4 w-4 fill-saffron-500 text-saffron-500" /> for India's heritage
          </p>
        </div>
      </div>
    </footer>
  );
}
