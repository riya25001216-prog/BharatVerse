import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { India3D } from '../components/India3D';
import { GeoSearch } from '../components/GeoSearch';
import { SectionHeading } from '../components/Atmosphere';
import { SafeImage } from '../components/SafeImage';
import { imagePath } from '../lib/assets';
import { STATE_STORIES, REGIONS, REGION_COLORS, STATE_BY_ID } from '../data/states';

export function ExplorePage() {
  const [region, setRegion] = useState('All');
  const [query, setQuery] = useState('');
  const [focusId, setFocusId] = useState<string | null>(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STATE_STORIES.filter((s) => {
      const regionOk = region === 'All' || s.region === region;
      const queryOk =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.capital.toLowerCase().includes(q) ||
        s.languages.some((l) => l.toLowerCase().includes(q)) ||
        s.landmarks.some((l) => l.name.toLowerCase().includes(q));
      return regionOk && queryOk;
    });
  }, [region, query]);

  const openState = (id: string) => {
    if (!id) return;
    navigate(`/state/${id}`);
  };

  const focused = focusId ? STATE_BY_ID[focusId] : null;

  return (
    <section id="explore" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="The atlas"
          title="India in"
          highlight="three dimensions"
          description="Spin the country, filter it by region, or drop in a pair of exact coordinates. Click any state to open its page."
        />

        <div className="mx-auto mt-12 max-w-4xl">
          <GeoSearch onOpenState={openState} />
        </div>

        {/* filters */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="no-scrollbar flex w-full justify-start gap-1.5 overflow-x-auto sm:justify-center">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`chip shrink-0 border transition-all ${
                  region === r
                    ? 'border-transparent text-ink-950'
                    : 'border-parchment-200/10 bg-white/[0.03] text-parchment-200/55 hover:border-white/25 hover:text-parchment-100'
                }`}
                style={region === r ? { background: r === 'All' ? '#F6C46F' : REGION_COLORS[r] } : undefined}
              >
                {r}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter states, capitals, languages…"
            className="w-full max-w-sm rounded-full border border-parchment-200/10 bg-white/[0.04] px-4 py-2.5 text-[13px] text-parchment-100 placeholder-parchment-200/40 outline-none transition-colors focus:border-saffron-300/45"
            aria-label="Filter states"
          />
        </div>

        {/* 3D map + list */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <div className="glass relative overflow-hidden rounded-[30px] p-3">
            <div className="relative h-[420px] overflow-hidden rounded-[24px] sm:h-[640px]">
              <India3D
                className="absolute inset-0"
                selectedId={focusId}
                focusId={focusId}
                onSelect={openState}
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-parchment-200/20 bg-ink-950/60 px-3 py-1.5 text-[12px] text-parchment-200/65 backdrop-blur-md">
                Click to open in a new tab
              </div>
              {focused ? (
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-parchment-200/20 bg-ink-950/70 px-4 py-3 backdrop-blur-md">
                  <div className="min-w-0">
                    <div className="truncate text-[14px] font-medium text-parchment-100">{focused.name}</div>
                    <div className="text-[11.5px] text-parchment-200/50">{focused.tagline}</div>
                  </div>
                  <button
                    onClick={() => openState(focused.id)}
                    className="shrink-0 rounded-full bg-white/95 px-4 py-1.5 text-[12px] font-semibold text-ink-950"
                  >
                    Open page ↗
                  </button>
                </div>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 pb-1 pt-3 text-[12px] text-parchment-200/50">
              {Object.entries(REGION_COLORS).map(([r, c]) => (
                <span key={r} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: c }} />
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="glass flex max-h-[640px] flex-col rounded-[30px] p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[12px] text-parchment-200/50">
                {filtered.length} states & territories
              </h3>
              {focusId ? (
                <button
                  onClick={() => setFocusId(null)}
                  className="text-[12.5px] text-parchment-200/50 transition-colors hover:text-parchment-100"
                >
                  clear focus
                </button>
              ) : null}
            </div>
            <div className="mt-4 -mr-1 flex-1 space-y-1.5 overflow-y-auto pr-1">
              {filtered.map((s) => (
                <motion.div
                  key={s.id}
                  layout
                  className={`group flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors ${
                    focusId === s.id ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <button
                    onClick={() => setFocusId(s.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: REGION_COLORS[s.region] }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] text-parchment-100">{s.name}</span>
                      <span className="block truncate text-[12.5px] text-parchment-200/50">{s.capital}</span>
                    </span>
                  </button>
                  <Link
                    to={`/state/${s.id}`}
                    className="shrink-0 rounded-lg border border-parchment-200/10 px-2.5 py-1 text-[12px] text-parchment-200/50 opacity-0 transition-all hover:border-white/25 hover:text-parchment-100 group-hover:opacity-100"
                  >
                    open ↗
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* state cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.3) }}
            >
              <Link
                to={`/state/${s.id}`}
                className="group glass card-hover block overflow-hidden rounded-[24px]"
              >
                <div className="relative h-40 overflow-hidden">
                  <SafeImage
                    src={imagePath(s.image)}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-ink-950/60 px-2.5 py-1 text-[12px] text-parchment-200/70 backdrop-blur-md">
                    {s.type === 'UT' ? 'UT' : 'State'} · {s.region}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-light text-parchment-100">{s.name}</h3>
                    <span className="text-parchment-200/50 transition-transform group-hover:translate-x-0.5">↗</span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] italic text-parchment-200/50">{s.tagline}</p>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-parchment-200/50">{s.vibe}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
