import { AnimatePresence, motion } from 'framer-motion';
import { STATE_BY_ID } from '../data/states';
import { JOURNEYS } from '../data/journeys';
import type { StateStory } from '../data/types';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 py-2.5 last:border-0">
      <span className="shrink-0 text-[12px] text-parchment-200/50">{label}</span>
      <span className="text-right text-[13px] leading-snug text-parchment-100">{value}</span>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="text-[12px] text-parchment-200/50">{title}</h4>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="chip border border-parchment-200/10 bg-white/5 text-parchment-200/75 transition-colors hover:border-saffron-300/40 hover:text-parchment-100"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StateDetails({
  state,
  onAsk,
}: {
  state: StateStory | null;
  onAsk: (question: string) => void;
}) {
  const journey = state ? JOURNEYS.find((j) => j.states.includes(state.id)) : undefined;

  return (
    <AnimatePresence mode="wait">
      {state ? (
        <motion.div
          key={state.id}
          initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative overflow-hidden rounded-[28px]"
        >
          {/* banner */}
          <div className="relative h-52 overflow-hidden sm:h-60">
            <img
              src={`/images/${state.image}.jpg`}
              alt={state.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
            <div
              className="absolute inset-0 opacity-60 mix-blend-overlay"
              style={{ background: `linear-gradient(140deg, ${state.accent}55, transparent 62%)` }}
            />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-1 text-[12px] font-semibold text-ink-950"
                  style={{ background: state.accent }}
                >
                  {state.type === 'UT' ? 'Union Territory' : 'State'}
                </span>
                <span className="rounded-full border border-parchment-200/20 bg-ink-950/50 px-2.5 py-1 text-[12px] text-parchment-200/70 backdrop-blur-md">
                  {state.region}
                </span>
              </div>
              <h3 className="mt-2.5 font-display text-3xl font-light leading-none text-parchment-100 sm:text-4xl">
                {state.name}
              </h3>
              <p className="mt-1.5 text-[13px] italic text-parchment-200/65">{state.tagline}</p>
            </div>
          </div>

          {/* body */}
          <div className="space-y-6 p-5 sm:p-6">
            <p className="text-[14px] leading-relaxed text-parchment-200/70">{state.vibe}</p>

            <div className="grid grid-cols-2 gap-x-5 sm:grid-cols-2">
              <Row label="Capital" value={state.capital} />
              <Row label="Area" value={`${state.areaKm2.toLocaleString('en-IN')} km²`} />
              <Row label="Population" value={`~${state.populationCrore} crore`} />
              <Row label="Formed" value={state.formed} />
            </div>

            <div>
              <h4 className="text-[12px] text-parchment-200/50">Festivals</h4>
              <ul className="mt-2.5 space-y-2">
                {state.festivals.map((f) => (
                  <li key={f.name} className="flex gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: state.accent }}
                    />
                    <span className="text-[13px] leading-snug text-parchment-200/75">
                      <strong className="font-semibold text-parchment-100">{f.name}</strong>
                      <span className="text-parchment-200/50"> · {f.when}</span>
                      <span className="block text-parchment-200/50">{f.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] text-parchment-200/50">Landmarks</h4>
              <ul className="mt-2.5 space-y-2">
                {state.landmarks.map((l) => (
                  <li key={l.name} className="flex gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/35"
                    />
                    <span className="text-[13px] leading-snug text-parchment-200/75">
                      <strong className="font-semibold text-parchment-100">{l.name}</strong>
                      <span className="block text-parchment-200/50">{l.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <List title="Signature dishes" items={state.cuisine} />
            <List title="Art & craft" items={state.artForms} />

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-parchment-200/10 bg-white/[0.03] px-3.5 py-3">
                <div className="text-[12px] text-parchment-200/50">State animal</div>
                <div className="mt-1 text-[13px] text-parchment-100">{state.stateAnimal}</div>
              </div>
              <div className="rounded-2xl border border-parchment-200/10 bg-white/[0.03] px-3.5 py-3">
                <div className="text-[12px] text-parchment-200/50">State bird</div>
                <div className="mt-1 text-[13px] text-parchment-100">{state.stateBird}</div>
              </div>
            </div>

            <div className="rounded-2xl border border-saffron-300/20 bg-saffron-400/[0.07] p-4">
              <div className="text-[12px] text-saffron-300/80">Local tip</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-parchment-200/80">{state.guideTip}</p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => onAsk(`Tell me about ${state.name}`)}
                className="sheen inline-flex items-center gap-2 rounded-full bg-saffron-400 hover:bg-saffron-300 px-5 py-2.5 text-[13px] font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
              >
                Ask the guide
              </button>
              <button
                onClick={() => onAsk(`Food in ${state.name}`)}
                className="rounded-full border border-parchment-200/20 px-5 py-2.5 text-[13px] font-medium text-parchment-200/75 transition-colors hover:border-white/30 hover:text-parchment-100"
              >
                What to eat
              </button>
              <button
                onClick={() => onAsk(`Festivals in ${state.name}`)}
                className="rounded-full border border-parchment-200/20 px-5 py-2.5 text-[13px] font-medium text-parchment-200/75 transition-colors hover:border-white/30 hover:text-parchment-100"
              >
                Festivals
              </button>
            </div>

            {journey ? (
              <a
                href="#guide"
                className="flex items-center justify-between gap-4 rounded-2xl border border-parchment-200/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-saffron-300/30"
              >
                <span>
                  <span className="block text-[12px] text-parchment-200/50">
                    On this route
                  </span>
                  <span className="mt-0.5 block text-[13px] text-parchment-100">{journey.name}</span>
                </span>
                <span className="text-saffron-300">→</span>
              </a>
            ) : null}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="glass flex h-full min-h-[420px] flex-col items-center justify-center rounded-[28px] p-10 text-center"
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-parchment-200/10 bg-white/5 text-saffron-300">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="2.6" />
            </svg>
          </div>
          <h3 className="mt-5 font-display text-2xl font-light text-parchment-100">Pick a state</h3>
          <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-parchment-200/50">
            Click any state on the map, or choose one from the strip below, to open its story.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function stateById(id: string | null) {
  return id ? STATE_BY_ID[id] ?? null : null;
}
