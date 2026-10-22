import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import credits from '../data/image-credits.json';
import { STATE_STORIES } from '../data/states';

const CREDIT_LIST = Object.values(credits as Record<string, { title: string; credit: string; license: string; source: string }>);

export function Footer() {
  const [showCredits, setShowCredits] = useState(false);

  return (
    <footer className="relative border-t border-white/8 pt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-saffron-400 via-lotus-400 to-indigo2-400 font-display text-base font-semibold text-ink-950">
                ॐ
              </span>
              <span className="font-display text-xl font-medium text-white">
                Bharat<span className="text-saffron-300">Verse</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-white/45">
              An interactive atlas of the 28 states and 8 union territories of India — built as a
              cinematic, liquid-glass journey for Innotech 2026. Everything on this page, including
              the guide, runs locally in your browser.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip border border-white/10 bg-white/[0.04] text-white/55">
                React + TypeScript
              </span>
              <span className="chip border border-white/10 bg-white/[0.04] text-white/55">
                Vite
              </span>
              <span className="chip border border-white/10 bg-white/[0.04] text-white/55">
                Framer Motion
              </span>
              <span className="chip border border-white/10 bg-white/[0.04] text-white/55">
                D3 Geo
              </span>
              <span className="chip border border-white/10 bg-white/[0.04] text-white/55">
                Offline guide
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.24em] text-white/40">Map & data</h4>
            <ul className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-white/50">
              <li>
                State boundaries are derived from open district-level geodata and dissolved, then
                simplified for the web. Areas and population figures follow the Census of India 2011
                and the Survey of India.
              </li>
              <li>
                The map follows the official Indian claim for the northern and north-eastern
                territories.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.24em] text-white/40">Photography</h4>
            <p className="mt-4 text-[13px] leading-relaxed text-white/50">
              {CREDIT_LIST.length} photographs from Wikimedia Commons, reused under their respective
              free licences.
            </p>
            <button
              onClick={() => setShowCredits((v) => !v)}
              className="mt-3 rounded-full border border-white/15 px-4 py-2 text-[12px] font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              {showCredits ? 'Hide credits' : 'Show credits'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showCredits && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="mt-8 grid gap-x-8 gap-y-2 border-t border-white/8 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                {CREDIT_LIST.map((c) => (
                  <a
                    key={c.source}
                    href={c.source}
                    target="_blank"
                    rel="noreferrer"
                    className="group text-[11.5px] leading-snug text-white/35 transition-colors hover:text-white/70"
                  >
                    <span className="line-clamp-2">{c.title}</span>
                    <span className="block text-[10px] text-white/25">
                      {c.license || 'Wikimedia Commons'} · {c.credit || 'see source'}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="divider-glow my-10" />

        <div className="flex flex-col items-center justify-between gap-4 pb-10 sm:flex-row">
          <p className="text-[12px] text-white/30">
            © {new Date().getFullYear()} BharatVerse · A student project · Made with care for India.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-white/30">
            {STATE_STORIES.slice(0, 6).map((s) => (
              <a
                key={s.id}
                href="#explore"
                className="transition-colors hover:text-saffron-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {s.name}
              </a>
            ))}
            <span className="text-white/20">+30 more</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
