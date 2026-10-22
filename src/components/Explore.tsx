import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { IndiaMap } from './IndiaMap';
import { StateDetails } from './StateDetails';
import { SectionHeading } from './Atmosphere';
import { STATE_STORIES, REGIONS, REGION_COLORS, STATE_BY_ID } from '../data/states';
import type { StateStory } from '../data/types';

export function Explore({ onAsk }: { onAsk: (question: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [region, setRegion] = useState('All');
  const [query, setQuery] = useState('');

  const selected = selectedId ? STATE_BY_ID[selectedId] ?? null : null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STATE_STORIES.filter((s) => {
      const regionOk = region === 'All' || s.region === region;
      const queryOk =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.capital.toLowerCase().includes(q) ||
        s.languages.some((l) => l.toLowerCase().includes(q)) ||
        s.landmarks.some((l) => l.name.toLowerCase().includes(q)) ||
        s.cuisine.some((c) => c.toLowerCase().includes(q));
      return regionOk && queryOk;
    });
  }, [region, query]);

  const select = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="explore" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Section One"
          title="The atlas —"
          highlight="every border, a story"
          description="Drag and zoom the map, filter by region, or search for a state, a language or a dish. Select any state to open its full story."
        />

        {/* controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="glass mx-auto mt-12 flex max-w-5xl flex-col gap-4 rounded-3xl p-4 sm:p-5 lg:flex-row lg:items-center"
        >
          <div className="relative flex-1">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a state, capital, language or dish…"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-saffron-300/45 focus:bg-white/[0.06]"
              aria-label="Search states"
            />
          </div>

          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
            {REGIONS.map((r) => {
              const active = region === r;
              return (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`chip shrink-0 border transition-all ${
                    active
                      ? 'border-transparent text-ink-950'
                      : 'border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white/90'
                  }`}
                  style={active ? { background: r === 'All' ? '#ffc46b' : REGION_COLORS[r] } : undefined}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* map + details */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative overflow-hidden rounded-[30px] p-3 sm:p-5"
          >
            <div className="flex items-center justify-between px-2 pb-1 pt-1">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live map
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                {filtered.length} of {STATE_STORIES.length} shown
              </div>
            </div>
            <IndiaMap
              selectedId={selectedId}
              onSelect={select}
              regionFilter={region}
              query={query}
            />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 pb-1 pt-3 text-[10px] uppercase tracking-[0.18em] text-white/35">
              {Object.entries(REGION_COLORS).map(([r, c]) => (
                <span key={r} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: c }} />
                  {r}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <StateDetails state={selected} onAsk={onAsk} />
          </div>
        </div>

        {/* quick picker strip */}
        <div className="mt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/35">Quick pick</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-4">
            {STATE_STORIES.map((s: StateStory) => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`group relative w-44 shrink-0 overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                  selectedId === s.id
                    ? 'border-saffron-300/60 shadow-[0_0_50px_-12px_rgba(249,138,9,0.7)]'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img
                  src={`/images/${s.image}.jpg`}
                  alt={s.name}
                  loading="lazy"
                  className="h-28 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="truncate text-[13px] font-medium text-white">{s.name}</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/45">
                    {s.capital}
                  </div>
                </div>
                <span
                  className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full"
                  style={{ background: REGION_COLORS[s.region] }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
