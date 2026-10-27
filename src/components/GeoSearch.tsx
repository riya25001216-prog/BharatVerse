import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { locate, parseCoordinates, capitalCoords, haversineKm } from '../lib/geo';
import { STATE_BY_ID } from '../data/states';

interface Props {
  onOpenState: (id: string) => void;
}

export function GeoSearch({ onOpenState }: Props) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'idle' | 'locating' | 'error'>('idle');
  const [result, setResult] = useState<{
    kind: 'exact' | 'nearest' | 'state';
    id: string;
    name: string;
    title: string;
    detail: string;
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState('');

  const runCoordinateSearch = (lat: number, lng: number) => {
    const hit = locate(lat, lng);
    if (!hit) return;
    const [capLat, capLng] = capitalCoords(hit.id);
    const toCapital = haversineKm(lat, lng, capLat, capLng);
    setResult({
      kind: hit.inside ? 'exact' : 'nearest',
      id: hit.id,
      name: hit.name,
      title: hit.inside ? `You are inside ${hit.name}` : `Nearest state: ${hit.name}`,
      detail: hit.inside
        ? `${lat.toFixed(4)}°, ${lng.toFixed(4)}° falls within ${hit.name} · ${toCapital.toFixed(
            0
          )} km to ${hit.capital}.`
        : `${lat.toFixed(4)}°, ${lng.toFixed(4)}° is outside the country — the closest state is ${hit.name}, ${hit.distanceKm.toFixed(
            0
          )} km away.`,
      lat,
      lng,
    });
    setStatus('idle');
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const coords = parseCoordinates(query);
    if (coords) {
      runCoordinateSearch(coords.lat, coords.lng);
      return;
    }
    const q = query.trim().toLowerCase();
    if (!q) return;
    const story = Object.values(STATE_BY_ID).find(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.capital.toLowerCase().includes(q) ||
        s.languages.some((l) => l.toLowerCase().includes(q)) ||
        s.landmarks.some((l) => l.name.toLowerCase().includes(q))
    );
    if (story) {
      const [capLat, capLng] = capitalCoords(story.id);
      setResult({
        kind: 'state',
        id: story.id,
        name: story.name,
        title: story.name,
        detail: `${story.tagline} · capital ${story.capital} (${capLat.toFixed(2)}°, ${capLng.toFixed(2)}°)`,
        lat: capLat,
        lng: capLng,
      });
      return;
    }
    setError(`Nothing matched “${query}”. Try a state name, or coordinates like 12.9716, 77.5946.`);
  };

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) {
      setError('This browser does not expose a location API.');
      return;
    }
    setStatus('locating');
    setError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        runCoordinateSearch(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        setStatus('error');
        setError(
          err.code === err.PERMISSION_DENIED
            ? 'Location permission denied — you can type coordinates instead.'
            : 'Could not read your position. Type coordinates instead.'
        );
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  return (
    <div className="glass rounded-3xl p-4 sm:p-5">
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-parchment-200/50"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="State name, or exact coordinates — 12.9716, 77.5946"
            className="w-full rounded-2xl border border-parchment-200/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-parchment-100 placeholder-parchment-200/40 outline-none transition-colors focus:border-saffron-300/45 focus:bg-white/[0.06]"
            aria-label="Search by name or exact coordinates"
          />
        </div>
        <button
          type="button"
          onClick={useMyLocation}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-parchment-200/20 px-4 py-3 text-[13px] font-medium text-parchment-200/80 transition-colors hover:border-white/35 hover:text-parchment-100"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
            <circle cx="12" cy="12" r="8" />
          </svg>
          {status === 'locating' ? 'Locating…' : 'Use my location'}
        </button>
        <button
          type="submit"
          className="sheen rounded-2xl bg-saffron-400 hover:bg-saffron-300 px-6 py-3 text-[13px] font-semibold text-ink-950"
        >
          Locate
        </button>
      </form>

      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-[12.5px] text-lotus-300"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {result ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 flex flex-col gap-3 rounded-2xl border border-saffron-300/25 bg-saffron-400/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-saffron-300 px-2 py-0.5 text-[12px] font-bold text-ink-950">
                  {result.kind === 'exact'
                    ? 'Exact location'
                    : result.kind === 'nearest'
                      ? 'Nearest'
                      : 'Match'}
                </span>
                <span className="text-[14px] font-semibold text-parchment-100">{result.title}</span>
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-parchment-200/65">{result.detail}</p>
            </div>
            <button
              onClick={() => onOpenState(result.id)}
              className="shrink-0 rounded-full bg-white/95 px-4 py-2 text-[12.5px] font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
            >
              Open {result.name} ↗
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
