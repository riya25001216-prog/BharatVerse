import { Mic } from 'lucide-react';
import { useGuide } from '../lib/ask';

const PROMPTS = [
  'What should I eat in Kolkata?',
  'Plan me three days in Rajasthan',
  'When is the Hornbill Festival?',
  'Is October good for Ladakh?',
];

/** Home-page introduction to the ElevenLabs voice guide. */
export function MeetTara() {
  const { openVoice, ask } = useGuide();

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="meet-tara">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="flex items-center gap-3 text-[14px] font-medium text-saffron-300">
            <span className="h-px w-8 bg-saffron-400/80" aria-hidden="true" />
            Your guide, out loud
          </p>
          <h2
            id="meet-tara"
            className="mt-5 font-display text-4xl font-light leading-[1.05] tracking-[-0.025em] text-parchment-100 sm:text-5xl md:text-[3.5rem]"
          >
            Just ask <span className="font-playfair text-saffron-400">Tara</span>.
          </h2>
          <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-parchment-200/70">
            Tara is a voice guide who knows every state on this map: the food worth crossing a city for, the
            month a festival fills the streets, the trick to beating the queue. Press the button, allow your
            microphone, and talk the way you would to a friend who has been everywhere.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button type="button" onClick={openVoice} className="btn-primary !px-7 !py-3.5 text-[15px]">
              <Mic size={18} />
              Start talking
            </button>
            <span className="text-[13px] text-parchment-200/50">Voice by ElevenLabs. Prefer typing? That works too.</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square">
            {/* concentric rangoli rings around the orb */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
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
            <button
              type="button"
              onClick={openVoice}
              className="group absolute inset-[30%] rounded-full focus-visible:outline-offset-8"
              aria-label="Start talking to Tara"
            >
              <span className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(242,169,59,0.35),transparent_68%)] transition-transform duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#FBEBCB_0%,#F6C46F_28%,#E8901F_62%,#C9740E_100%)] shadow-[0_0_60px_-8px_rgba(242,169,59,0.8),inset_0_-10px_24px_rgba(201,116,14,0.6)] transition-transform duration-500 group-hover:scale-[1.04]" />
              <Mic className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-ink-950/80" size={34} strokeWidth={1.8} />
            </button>
          </div>

          <ul className="mt-2 flex flex-wrap justify-center gap-2" aria-label="Things you can ask">
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
