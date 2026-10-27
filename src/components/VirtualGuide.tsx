import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from './Atmosphere';
import { JOURNEYS } from '../data/journeys';
import { STATE_BY_ID } from '../data/states';

const AUTOPLAY_MS = 7000;

export function VirtualGuide() {
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [stopIndex, setStopIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hotspotOpen, setHotspotOpen] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  const journey = JOURNEYS[journeyIndex];
  const stop = journey.stops[Math.min(stopIndex, journey.stops.length - 1)];

  const changeJourney = useCallback((index: number) => {
    setJourneyIndex(index);
    setStopIndex(0);
    setHotspotOpen(null);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setStopIndex((i) => (i + 1) % journey.stops.length);
      setHotspotOpen(null);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, stopIndex, journey.stops.length]);

  const onMove = (e: React.MouseEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 2.4, y: y * -1.8 });
  };

  const go = (dir: 1 | -1) => {
    setStopIndex((i) => (i + dir + journey.stops.length) % journey.stops.length);
    setHotspotOpen(null);
  };

  const stopState = stop.stateId ? STATE_BY_ID[stop.stateId] : undefined;

  return (
    <section id="guide" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Section Two"
          title="The virtual guide —"
          highlight="walk the route"
          description="Six curated journeys through India, staged like a film. Move between stops, follow the hot spots, and read the day-by-day plan that comes with each route."
        />

        {/* journey picker */}
        <div className="no-scrollbar -mx-1 mt-12 flex gap-4 overflow-x-auto px-1 pb-4">
          {JOURNEYS.map((j, i) => (
            <button
              key={j.id}
              onClick={() => changeJourney(i)}
              className={`group relative w-[260px] shrink-0 overflow-hidden rounded-3xl border text-left transition-all duration-500 sm:w-[300px] ${
                journeyIndex === i
                  ? 'border-saffron-300/55 shadow-[0_0_60px_-16px_rgba(232,144,31,0.8)]'
                  : 'border-parchment-200/10 hover:border-white/25'
              }`}
            >
              <img
                src={`/images/${j.cover}.jpg`}
                alt={j.name}
                loading="lazy"
                className="h-36 w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="text-[12px] text-saffron-300/80">
                  {j.subtitle}
                </div>
                <div className="mt-1 font-display text-lg font-light text-parchment-100">{j.name}</div>
              </div>
              <span className="absolute right-3 top-3 rounded-full border border-parchment-200/20 bg-ink-950/60 px-2.5 py-1 text-[12px] text-parchment-200/70 backdrop-blur-md">
                {j.duration}
              </span>
            </button>
          ))}
        </div>

        {/* stage */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <div
            ref={stageRef}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="glass relative overflow-hidden rounded-[30px] p-2 sm:p-3"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] sm:aspect-[16/9]">
              <AnimatePresence mode="sync">
                <motion.img
                  key={stop.image + stop.title}
                  src={`/images/${stop.image}.jpg`}
                  alt={stop.title}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{
                    opacity: 1,
                    scale: 1.02,
                    x: tilt.x,
                    y: tilt.y,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1.1 },
                    scale: { duration: 9, ease: 'linear' },
                    x: { type: 'spring', stiffness: 60, damping: 20 },
                    y: { type: 'spring', stiffness: 60, damping: 20 },
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-ink-950/30" />

              {/* top bar */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
                <div>
                  <div className="text-[12px] text-saffron-300/85">
                    {journey.name}
                  </div>
                  <div className="mt-1 font-display text-xl font-light text-parchment-100 sm:text-2xl">
                    {stop.title}
                  </div>
                </div>
                <div className="rounded-full border border-parchment-200/20 bg-ink-950/50 px-3 py-1.5 text-[12px] text-parchment-200/70 backdrop-blur-md">
                  {stopIndex + 1} / {journey.stops.length}
                </div>
              </div>

              {/* hot spot */}
              <button
                onClick={() => setHotspotOpen((h) => (h === stopIndex ? null : stopIndex))}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${stop.hotspot.x}%`, top: `${stop.hotspot.y}%` }}
                aria-label="Hot spot"
              >
                <span className="relative flex h-9 w-9 items-center justify-center">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full border border-saffron-300/80" />
                  <span className="relative h-3.5 w-3.5 rounded-full border border-saffron-200 bg-saffron-400/80 shadow-glow" />
                </span>
              </button>

              <AnimatePresence>
                {hotspotOpen === stopIndex && (
                  <motion.div
                    initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                    transition={{ duration: 0.4 }}
                    className="glass absolute left-4 right-4 bottom-[7.5rem] z-20 rounded-2xl p-4 sm:left-6 sm:right-auto sm:max-w-sm"
                  >
                    <div className="text-[12px] text-saffron-300/80">
                      {stop.place}
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-parchment-200/80">
                      {stop.description}
                    </p>
                    <div className="mt-2.5 flex items-center gap-2 text-[12.5px] text-parchment-200/50">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
                        <path d="M15.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
                      </svg>
                      {stop.sound}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* controls */}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4 sm:p-5">
                <button
                  onClick={() => go(-1)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-parchment-200/20 bg-ink-950/50 text-parchment-200/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-parchment-100"
                  aria-label="Previous stop"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H6M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-parchment-200/20 bg-ink-950/50 text-parchment-200/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-parchment-100"
                  aria-label={playing ? 'Pause tour' : 'Play tour'}
                >
                  {playing ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => go(1)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-parchment-200/20 bg-ink-950/50 text-parchment-200/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-parchment-100"
                  aria-label="Next stop"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="ml-1 flex flex-1 gap-1.5">
                  {journey.stops.map((s, i) => (
                    <button
                      key={s.title}
                      onClick={() => {
                        setStopIndex(i);
                        setHotspotOpen(null);
                      }}
                      className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"
                      aria-label={`Go to ${s.title}`}
                    >
                      {i < stopIndex ? (
                        <span className="absolute inset-0 bg-saffron-300/80" />
                      ) : i === stopIndex ? (
                        <motion.span
                          key={`${journeyIndex}-${stopIndex}-${playing}`}
                          className="absolute inset-y-0 left-0 bg-saffron-300"
                          initial={{ width: '0%' }}
                          animate={{ width: playing ? '100%' : '35%' }}
                          transition={{ duration: playing ? AUTOPLAY_MS / 1000 : 0.4, ease: 'linear' }}
                        />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* itinerary */}
          <motion.div
            key={journey.id}
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex flex-col gap-5 rounded-[30px] p-5 sm:p-6"
          >
            <div>
              <div className="text-[12px] text-saffron-300/80">
                {journey.subtitle}
              </div>
              <h3 className="mt-1.5 font-display text-2xl font-light text-parchment-100">{journey.name}</h3>
              <p className="mt-2 text-[13px] italic leading-relaxed text-parchment-200/55">{journey.tagline}</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { k: 'Duration', v: journey.duration },
                { k: 'Distance', v: journey.distance },
                { k: 'Budget', v: journey.budget },
                { k: 'Best time', v: journey.bestTime },
              ].map((f) => (
                <div key={f.k} className="rounded-2xl border border-parchment-200/10 bg-white/[0.03] px-3.5 py-3">
                  <div className="text-[12px] text-parchment-200/50">{f.k}</div>
                  <div className="mt-1 text-[12.5px] leading-snug text-parchment-100">{f.v}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[12px] text-parchment-200/50">The plan</span>
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-[12px] text-parchment-200/50">
                  {journey.difficulty}
                </span>
              </div>
              <ol className="relative space-y-4 border-l border-parchment-200/10 pl-5">
                {journey.plan.map((p) => (
                  <li key={p.day} className="relative">
                    <span className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full bg-saffron-300/80 ring-4 ring-ink-950" />
                    <div className="text-[12px] text-saffron-300/70">
                      {p.day}
                    </div>
                    <div className="mt-0.5 text-[13.5px] font-medium text-parchment-100">{p.title}</div>
                    <div className="mt-0.5 text-[12.5px] leading-relaxed text-parchment-200/50">{p.detail}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div className="mb-2.5 text-[12px] text-parchment-200/50">
                What to pack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {journey.kit.map((k) => (
                  <span
                    key={k}
                    className="chip border border-parchment-200/10 bg-white/5 text-parchment-200/70"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {stopState ? (
              <a
                href="#explore"
                className="flex items-center justify-between gap-3 rounded-2xl border border-parchment-200/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-saffron-300/30"
              >
                <span className="flex items-center gap-3">
                  <img
                    src={`/images/${stopState.image}.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-9 w-9 rounded-xl object-cover"
                  />
                  <span>
                    <span className="block text-[12px] text-parchment-200/50">
                      This stop is in
                    </span>
                    <span className="block text-[13px] text-parchment-100">{stopState.name}</span>
                  </span>
                </span>
                <span className="text-saffron-300">→</span>
              </a>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
