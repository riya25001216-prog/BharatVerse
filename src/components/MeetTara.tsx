import { Mic } from 'lucide-react';
import { useGuide } from '../lib/ask';
import { AnimeTara } from './AnimeTara';

const PROMPTS = [
  'What should I eat in Kolkata?',
  'Plan me three days in Rajasthan',
  'When is the Hornbill Festival?',
  'Is October good for Ladakh?',
];

/** Home-page introduction to Tara, the multilingual anime virtual guide. */
export function MeetTara() {
  const { openVoice, ask } = useGuide();

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="meet-tara">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="flex items-center gap-3 text-[14px] font-medium text-saffron-300">
            <span className="h-px w-8 bg-saffron-400/80" aria-hidden="true" />
            Your cultural companion
          </p>
          <h2
            id="meet-tara"
            className="mt-5 font-display text-4xl font-light leading-[1.05] tracking-[-0.025em] text-parchment-100 sm:text-5xl md:text-[3.5rem]"
          >
            Meet <span className="font-playfair text-saffron-400">Tara</span>, your virtual guide.
          </h2>
          <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-parchment-200/70">
            Tara knows all 28 states and 8 union territories: traditional attire, signature cuisines, master handlooms, regional festivals, and hidden gems. Speak or type in 10 Indian languages.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button type="button" onClick={openVoice} className="btn-primary !px-7 !py-3.5 text-[15px]">
              <Mic size={18} />
              Start talking to Tara
            </button>
            <span className="text-[13px] text-parchment-200/50">Supports 10 Indian languages via voice & text.</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md flex flex-col items-center">
          <div className="relative aspect-square flex items-center justify-center">
            {/* concentric rangoli rings around Tara */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true">
              {[190, 150, 112].map((r, i) => (
                <circle
                  key={r}
                  cx="200"
                  cy="200"
                  r={r}
                  fill="none"
                  stroke={i === 1 ? '#F2A93B' : '#F3E9D6'}
                  strokeOpacity={i === 1 ? 0.35 : 0.12}
                  strokeDasharray={i === 0 ? '2 10' : i === 1 ? '1 0' : '4 6'}
                />
              ))}
              {Array.from({ length: 16 }).map((_, i) => {
                const a = (i / 16) * Math.PI * 2;
                return (
                  <circle
                    key={i}
                    cx={200 + Math.cos(a) * 150}
                    cy={200 + Math.sin(a) * 150}
                    r={i % 2 ? 2 : 3.5}
                    fill={i % 2 ? '#F3E9D6' : '#F2A93B'}
                    fillOpacity={i % 2 ? 0.35 : 0.8}
                  />
                );
              })}
            </svg>

            {/* Anime Tara interactive avatar button */}
            <button
              type="button"
              onClick={openVoice}
              className="group relative z-10 p-6 rounded-full transition-transform duration-500 hover:scale-105 focus-visible:outline-offset-8"
              aria-label="Start talking to Tara"
            >
              <AnimeTara size="xl" state="idle" showBadge />
            </button>
          </div>

          <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Things you can ask">
            {PROMPTS.map((p) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => ask(p)}
                  className="rounded-full border border-parchment-200/15 px-3.5 py-2 text-[13px] text-parchment-200/80 transition-colors hover:border-saffron-400/50 hover:text-parchment-100"
                >
                  “{p}”
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
