import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import credits from '../data/image-credits.json';
import { STATE_STORIES } from '../data/states';

const CREDIT_LIST = Object.values(credits as Record<string, { title: string; credit: string; license: string; source: string }>);

export function Footer() {
  const [showCredits, setShowCredits] = useState(false);

  return (
    <footer className="relative mt-12 border-t border-parchment-200/10 bg-ink-950/60 pt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 1.8 22.2 12 12 22.2 1.8 12Z" stroke="#F2A93B" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M12 6.4 17.6 12 12 17.6 6.4 12Z" stroke="#F3E9D6" strokeOpacity=".7" strokeWidth="1.1" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="2" fill="#F2A93B" />
              </svg>
              <span className="font-display text-2xl font-medium tracking-tight text-parchment-100">
                Bharat<span className="font-playfair font-normal text-saffron-400">Verse</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-parchment-200/55">
              An interactive atlas of the 28 states and 8 union territories of India — built as a
              cinematic, liquid-glass journey for Innotech 2026. Everything on this page, including
              the guide, runs locally in your browser.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip border border-parchment-200/10 bg-white/[0.04] text-parchment-200/55">
                React + TypeScript
              </span>
              <span className="chip border border-parchment-200/10 bg-white/[0.04] text-parchment-200/55">
                Vite
              </span>
              <span className="chip border border-parchment-200/10 bg-white/[0.04] text-parchment-200/55">
                Framer Motion
              </span>
              <span className="chip border border-parchment-200/10 bg-white/[0.04] text-parchment-200/55">
                D3 Geo
              </span>
              <span className="chip border border-parchment-200/10 bg-white/[0.04] text-parchment-200/55">
                Offline guide
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-parchment-100">Map and data</h4>
            <ul className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-parchment-200/55">
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
            <h4 className="font-display text-lg text-parchment-100">Photography</h4>
            <p className="mt-4 text-[13px] leading-relaxed text-parchment-200/55">
              {CREDIT_LIST.length} photographs from Wikimedia Commons, reused under their respective
              free licences.
            </p>
            <button
              onClick={() => setShowCredits((v) => !v)}
              className="mt-3 rounded-full border border-parchment-200/20 px-4 py-2 text-[12px] font-medium text-parchment-200/70 transition-colors hover:border-white/30 hover:text-parchment-100"
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
              <div className="mt-8 grid gap-x-8 gap-y-2 border-t border-parchment-200/10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                {CREDIT_LIST.map((c) => (
                  <a
                    key={c.source}
                    href={c.source}
                    target="_blank"
                    rel="noreferrer"
                    className="group text-[11.5px] leading-snug text-parchment-200/50 transition-colors hover:text-parchment-200/70"
                  >
                    <span className="line-clamp-2">{c.title}</span>
                    <span className="block text-[12px] text-parchment-200/50">
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
          <p className="text-[12px] text-parchment-200/40">
            © {new Date().getFullYear()} BharatVerse. A student project, made with care for India.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-parchment-200/40">
            {STATE_STORIES.slice(0, 6).map((s) => (
              <Link key={s.id} to={`/state/${s.id}`} className="transition-colors hover:text-saffron-300">
                {s.name}
              </Link>
            ))}
            <Link to="/destinations" className="text-parchment-200/60 transition-colors hover:text-saffron-300">
              All {STATE_STORIES.length} destinations
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
