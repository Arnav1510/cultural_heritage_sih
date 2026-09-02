import { X, Heart, MapPin, Trash2 } from 'lucide-react';
import { heritageData } from '@/data/heritageData';

interface FavoriteItem {
  state: string;
  itemId: string;
  title: string;
  image: string;
}

interface FavoritesModalProps {
  open: boolean;
  onClose: () => void;
  favorites: FavoriteItem[];
  onRemove: (state: string, itemId: string) => void;
  onSelect: (state: string, itemId: string) => void;
}

export function FavoritesModal({ open, onClose, favorites, onRemove, onSelect }: FavoritesModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="animate-scale-in relative z-10 max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron-500/15">
              <Heart className="h-5 w-5 fill-saffron-400 text-saffron-400" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">Your Favorites</h3>
              <p className="text-xs text-gray-400">{favorites.length} saved heritage items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {favorites.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                <Heart className="h-8 w-8 text-gray-500" />
              </div>
              <p className="text-gray-400">No favorites yet.</p>
              <p className="mt-1 text-sm text-gray-500">
                Tap the heart icon on any heritage item to save it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {favorites.map((fav) => {
                const stateData = heritageData[fav.state];
                if (!stateData) return null;
                const isAncestral = stateData.ancestral.some((i) => i.id === fav.itemId);
                return (
                  <div
                    key={`${fav.state}-${fav.itemId}`}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={fav.image}
                        alt={fav.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin className="h-3 w-3" />
                        {fav.state}
                        <span className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${
                          isAncestral ? 'bg-saffron-500/10 text-saffron-400' : 'bg-emerald2-500/10 text-emerald2-400'
                        }`}>
                          {isAncestral ? 'Ancestral' : 'Modern'}
                        </span>
                      </div>
                      <h4 className="mt-1 truncate font-medium text-white">{fav.title}</h4>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => onSelect(fav.state, fav.itemId)}
                          className="flex-1 rounded-lg bg-white/5 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onRemove(fav.state, fav.itemId)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-colors hover:bg-red-500/15 hover:text-red-400"
                          aria-label="Remove favorite"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
