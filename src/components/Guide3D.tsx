import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { India3D } from './India3D';
import { JOURNEYS } from '../data/journeys';
import { panoramaForStop } from '../data/panoramas';
import { STATE_BY_ID } from '../data/states';

const AUTOPLAY_MS = 8000;

export function Guide3D({ onOpenPanorama }: { onOpenPanorama: (slug: string) => void }) {
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [stopIndex, setStopIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const journey = JOURNEYS[journeyIndex];
  const stop = journey.stops[stopIndex];
  const panorama = panoramaForStop(journey.id, stopIndex);
  const state = STATE_BY_ID[stop.stateId];

  const route = useMemo(() => {
    const ids: string[] = [];
    for (const s of journey.stops) {
      if (!ids.includes(s.stateId)) ids.push(s.stateId);
    }
    return ids;
  }, [journey]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setStopIndex((i) => (i + 1) % journey.stops.length);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, stopIndex, journey.stops.length]);

  useEffect(() => {
    setStopIndex(0);
  }, [journeyIndex]);

  const go = (dir: 1 | -1) => {
    setStopIndex((i) => (i + dir + journey.stops.length) % journey.stops.length);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      {/* 3D stage */}
      <div className="glass relative overflow-hidden rounded-[30px] p-2 sm:p-3">
        <div className="relative h-[420px] overflow-hidden rounded-[24px] sm:h-[560px]">
          <India3D
            className="absolute inset-0"
            route={route}
            selectedId={stop.stateId}
            focusId={stop.stateId}
            fov={38}
            elevation={48}
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-saffron-300/90">
                {journey.subtitle}
              </div>
              <div className="mt-1 font-display text-xl font-light text-white sm:text-2xl">
                {journey.name}
              </div>
            </div>
            <div className="rounded-full border border-white/20 bg-ink-950/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
              Stop {stopIndex + 1} / {journey.stops.length}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4">
            <button
              onClick={() => go(-1)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-ink-950/60 text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
              aria-label="Previous stop"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H6M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-ink-950/60 text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => go(1)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-ink-950/60 text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
              aria-label="Next stop"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex flex-1 gap-1.5">
              {journey.stops.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setStopIndex(i)}
                  className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"
                  aria-label={s.title}
                >
                  {i < stopIndex ? (
                    <span className="absolute inset-0 bg-saffron-300/80" />
                  ) : i === stopIndex ? (
                    <motion.span
                      key={`${journeyIndex}-${stopIndex}-${playing}`}
                      className="absolute inset-y-0 left-0 bg-saffron-300"
                      initial={{ width: '0%' }}
                      animate={{ width: playing ? '100%' : '32%' }}
                      transition={{ duration: playing ? AUTOPLAY_MS / 1000 : 0.4, ease: 'linear' }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* narration */}
      <div className="glass flex flex-col gap-4 rounded-[30px] p-5 sm:p-6">
        <div className="flex flex-wrap gap-1.5">
          {JOURNEYS.map((j, i) => (
            <button
              key={j.id}
              onClick={() => setJourneyIndex(i)}
              className={`chip border transition-all ${
                journeyIndex === i
                  ? 'border-transparent bg-saffron-300 text-ink-950'
                  : 'border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white'
              }`}
            >
              {j.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${journey.id}-${stopIndex}`}
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45 }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={`/images/${stop.image}.jpg`}
                alt={stop.title}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-saffron-300/85">
                  {stop.place}
                </div>
                <h3 className="mt-1 font-display text-2xl font-light text-white">{stop.title}</h3>
              </div>
            </div>

            <p className="mt-4 text-[13.5px] leading-relaxed text-white/70">{stop.description}</p>

            <div className="mt-3 flex items-center gap-2 text-[11.5px] text-white/45">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
              </svg>
              {stop.sound}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {panorama ? (
                <button
                  onClick={() => onOpenPanorama(panorama.slug)}
                  className="sheen inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#ffc46b,#f98a09)] px-4 py-2.5 text-[12.5px] font-semibold text-ink-950"
                >
                  Enter the 360° scene ↗
                </button>
              ) : (
                <span className="rounded-full border border-white/12 px-4 py-2.5 text-[12px] text-white/40">
                  360° capture in progress
                </span>
              )}
              {state ? (
                <span className="rounded-full border border-white/12 px-4 py-2.5 text-[12px] text-white/60">
                  {state.name} · {state.bestMonths}
                </span>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="divider-glow" />

        <div className="grid grid-cols-2 gap-2.5">
          {[
            { k: 'Duration', v: journey.duration },
            { k: 'Distance', v: journey.distance },
            { k: 'Budget', v: journey.budget },
            { k: 'Best time', v: journey.bestTime },
          ].map((f) => (
            <div key={f.k} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
              <div className="text-[9px] uppercase tracking-[0.2em] text-white/35">{f.k}</div>
              <div className="mt-1 text-[12.5px] leading-snug text-white/85">{f.v}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">The plan</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <ol className="relative max-h-64 space-y-3.5 overflow-y-auto border-l border-white/10 pl-5 pr-1">
            {journey.plan.map((p) => (
              <li key={p.day} className="relative">
                <span className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full bg-saffron-300/80 ring-4 ring-ink-950" />
                <div className="text-[10px] uppercase tracking-[0.18em] text-saffron-300/70">{p.day}</div>
                <div className="mt-0.5 text-[13px] font-medium text-white">{p.title}</div>
                <div className="mt-0.5 text-[12px] leading-relaxed text-white/50">{p.detail}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
