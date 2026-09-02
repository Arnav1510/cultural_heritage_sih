import { useState, useEffect } from 'react';
import { Landmark, Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
  activeSection: string;
}

const links = [
  { label: 'Home', id: 'home' },
  { label: 'Explore Map', id: 'map' },
  { label: 'Heritage', id: 'heritage' },
  { label: 'About', id: 'about' },
];

export function Navbar({ onNavigate, onOpenFavorites, favoritesCount, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 transition-transform hover:scale-105"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-saffron-500 to-gold-500 shadow-lg shadow-saffron-500/30">
              <Landmark className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <span className="block font-display text-lg font-bold leading-tight text-white">
                Heritage India
              </span>
              <span className="block text-xs font-medium tracking-widest text-saffron-400">
                EXPLORER
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-saffron-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-saffron-400 to-gold-400" />
                )}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenFavorites}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-saffron-400/40 hover:text-saffron-400"
              aria-label="View favorites"
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-saffron-500 px-1 text-xs font-bold text-ink-950">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="animate-fade-in border-t border-white/10 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-saffron-500/10 text-saffron-400'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
