import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from './Atmosphere';
import { CURATED_STORIES, MOODS } from '../data/curated';
import { STATE_BY_ID } from '../data/states';

export function Stories({ onAsk }: { onAsk: (question: string) => void }) {
  const [mood, setMood] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>(null);

  const list = useMemo(
    () => (mood === 'All' ? CURATED_STORIES : CURATED_STORIES.filter((s) => s.moods.includes(mood as never))),
    [mood]
  );

  const open = list.find((s) => s.id === openId) ?? null;
  const openState = open ? STATE_BY_ID[open.stateId] : null;

  return (
    <section id="stories" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Field notes"
          title="Stories from the —"
          highlight="middle of the map"
          description="Twelve pieces written for this atlas — the animals, the artisans, the weather and the arguments that shaped each place."
        />

        <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-2">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`chip shrink-0 border transition-all ${
                mood === m
                  ? 'border-transparent bg-saffron-300 text-ink-950'
                  : 'border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((story, i) => {
              const state = STATE_BY_ID[story.stateId];
              return (
                <motion.button
                  key={story.id}
                  layout
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3) }}
                  onClick={() => setOpenId(story.id)}
                  className="glass card-hover group relative flex h-full flex-col overflow-hidden rounded-[26px] text-left"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={`/images/${state?.image ?? 'india'}.jpg`}
                      alt={story.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                      <span className="rounded-full border border-white/20 bg-ink-950/55 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
                        {story.moods[0]}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-saffron-300/85">
                        {story.eyebrow}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-light leading-snug text-white">
                      {story.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-white/55">
                      {story.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/70 transition-colors group-hover:text-saffron-300">
                      Read the piece
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* reader */}
      <AnimatePresence>
        {open && openState ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-md"
          >
            <motion.article
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[30px]"
            >
              <div className="relative h-56 sm:h-72">
                <img
                  src={`/images/${openState.image}.jpg`}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                <button
                  onClick={() => setOpenId(null)}
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-ink-950/60 text-white/80 backdrop-blur-md transition-colors hover:text-white"
                  aria-label="Close story"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                  </svg>
                </button>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-saffron-300/85">
                    {open.eyebrow}
                  </div>
                  <h2 className="mt-2 font-display text-3xl font-light leading-tight text-white">
                    {open.title}
                  </h2>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-[15px] italic leading-relaxed text-white/70">{open.excerpt}</p>
                <div className="divider-glow my-6" />
                <p className="text-[14.5px] leading-[1.85] text-white/72">{open.body}</p>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => {
                      setOpenId(null);
                      onAsk(`Tell me about ${openState.name}`);
                    }}
                    className="sheen rounded-full bg-[linear-gradient(90deg,#ffc46b,#f98a09)] px-5 py-2.5 text-[13px] font-semibold text-ink-950"
                  >
                    More about {openState.name}
                  </button>
                  <a
                    href="#explore"
                    onClick={() => setOpenId(null)}
                    className="rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium text-white/75 transition-colors hover:border-white/30 hover:text-white"
                  >
                    Open on the map
                  </a>
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
