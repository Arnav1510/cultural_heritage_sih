import { useState, useRef, useMemo } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { indiaStates } from '@/data/indiaStates';
import { heritageData } from '@/data/heritageData';

interface IndiaMapProps {
  selectedState: string | null;
  onSelectState: (state: string) => void;
}

export function IndiaMap({ selectedState, onSelectState }: IndiaMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const hasData = useMemo(() => new Set(Object.keys(heritageData)), []);

  const hoveredInfo = useMemo(() => {
    if (!hoveredId) return null;
    const state = indiaStates.find((s) => s.id === hoveredId);
    if (!state) return null;
    return { name: state.name, cx: state.cx, cy: state.cy };
  }, [hoveredId]);

  const selectedInfo = useMemo(() => {
    if (!selectedState) return null;
    return indiaStates.find((s) => s.name === selectedState) ?? null;
  }, [selectedState]);

  return (
    <div className="relative">
      {/* Map header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Interactive Heritage Map
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Click any state or union territory to explore its cultural heritage
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald2-500/60 ring-1 ring-emerald2-400/40" />
            Heritage data available
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-ink-600 ring-1 ring-white/20" />
            Coming soon
          </span>
        </div>
      </div>

      {/* Map container */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800/50 to-ink-900/80 p-4 backdrop-blur-sm sm:p-8">
        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #f97316, transparent)' }}
        />

        <svg
          ref={svgRef}
          viewBox="0 0 800 800"
          className="relative mx-auto h-auto w-full max-w-2xl"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))' }}
        >
          {/* State paths */}
          {indiaStates.map((state) => {
            const isSelected = selectedState === state.name;
            const isHovered = hoveredId === state.id;
            const hasHeritage = hasData.has(state.name);

            return (
              <path
                key={state.id}
                d={state.d}
                className={`state-path ${isSelected ? 'active' : ''} ${hasHeritage ? 'has-data' : ''}`}
                style={{
                  pointerEvents: 'all',
                  cursor: 'pointer',
                  transformOrigin: `${state.cx}px ${state.cy}px`,
                  transform: isSelected ? 'scale(1.02)' : isHovered ? 'scale(1.01)' : 'scale(1)',
                }}
                onMouseEnter={() => setHoveredId(state.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectState(state.name)}
              />
            );
          })}

          {/* Hover tooltip */}
          {hoveredInfo && (
            <g pointerEvents="none">
              <rect
                x={Math.min(Math.max(hoveredInfo.cx - 60, 10), 680)}
                y={hoveredInfo.cy - 30}
                width={120}
                height={24}
                rx={12}
                fill="rgba(7,10,20,0.9)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth={0.5}
              />
              <text
                x={Math.min(Math.max(hoveredInfo.cx, 70), 740)}
                y={hoveredInfo.cy - 13}
                textAnchor="middle"
                fill="#fcd34d"
                fontSize={12}
                fontWeight={600}
                fontFamily="'Plus Jakarta Sans', sans-serif"
              >
                {hoveredInfo.name}
              </text>
            </g>
          )}
        </svg>

        {/* Floating info card when state is selected */}
        {selectedState && selectedInfo && (
          <div className="animate-scale-in absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs">
            <div className="glass-strong rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-2 text-saffron-400">
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Selected</span>
              </div>
              <h3 className="mt-1 font-display text-xl font-bold text-white">{selectedState}</h3>
              {heritageData[selectedState] ? (
                <>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-300">
                    {heritageData[selectedState].blurb}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald2-400">
                    <Navigation className="h-3 w-3" />
                    Heritage panel opened below
                  </div>
                </>
              ) : (
                <p className="mt-1 text-sm text-gray-400">
                  Heritage content coming soon
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
