import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { STATE_BY_ID } from '../data/states';
import { PANORAMAS_BY_STATE } from '../data/panoramas';
import { India3D } from '../components/India3D';
import { SectionHeading } from '../components/Atmosphere';

const hash = (s: string) => s.split('').reduce((a, c) => a + c.charCodeAt(0), 0);

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
      <div className="text-[9px] uppercase tracking-[0.22em] text-white/35">{label}</div>
      <div className="mt-1 font-display text-lg font-light leading-tight text-white">{value}</div>
    </div>
  );
}

function ChipList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[10px] uppercase tracking-[0.24em] text-white/40">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((i) => (
          <span
            key={i}
            className="chip border border-white/10 bg-white/5 text-white/75 transition-colors hover:border-saffron-300/40 hover:text-white"
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatePage() {
  const { id = '' } = useParams();
  const state = STATE_BY_ID[id];
  const [showMap, setShowMap] = useState(true);
  const panoramas = useMemo(() => PANORAMAS_BY_STATE[id] ?? [], [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

  if (!state) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl font-light text-white">That state is not on the map</h1>
        <p className="mt-3 text-white/50">Try one of the 28 states or 8 union territories.</p>
        <Link
          to="/explore"
          className="mt-6 rounded-full bg-[linear-gradient(90deg,#ffc46b,#f98a09)] px-6 py-3 text-sm font-semibold text-ink-950"
        >
          Back to the atlas
        </Link>
      </div>
    );
  }

  const variant = hash(state.id) % 4;
  const accent = state.accent;
  const reverse = variant === 1 || variant === 3;

  return (
    <article className="pb-24">
      {/* hero */}
      <header
        className={`relative overflow-hidden ${variant === 2 ? 'h-[62vh] min-h-[440px]' : 'min-h-[78vh]'}`}
      >
        <img
          src={`/images/${state.image}.jpg`}
          alt={state.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/70" />
        <div
          className="absolute inset-0 opacity-55 mix-blend-overlay"
          style={{ background: `linear-gradient(140deg, ${accent}66, transparent 60%)` }}
        />

        <div className="relative mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-end px-5 pb-14 pt-32 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={reverse ? 'max-w-xl lg:ml-auto lg:text-right' : 'max-w-2xl'}
          >
            <div className={`flex items-center gap-2 ${reverse ? 'lg:justify-end' : ''}`}>
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-950"
                style={{ background: accent }}
              >
                {state.type === 'UT' ? 'Union Territory' : 'State'}
              </span>
              <span className="rounded-full border border-white/25 bg-ink-950/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/75 backdrop-blur-md">
                {state.region}
              </span>
              <span className="rounded-full border border-white/25 bg-ink-950/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/75 backdrop-blur-md">
                {state.formed}
              </span>
            </div>

            <h1 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight text-white sm:text-7xl">
              {state.name}
            </h1>
            <p className="mt-3 text-lg italic text-white/70">{state.tagline}</p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/60">{state.vibe}</p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {panoramas.map((p) => (
                <a
                  key={p.slug}
                  href={`/panorama/${p.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sheen inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#ffc46b,#f98a09)] px-5 py-2.5 text-[13px] font-semibold text-ink-950"
                >
                  360° · {p.name}
                  <span aria-hidden>↗</span>
                </a>
              ))}
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-ink-950/40 px-5 py-2.5 text-[13px] font-medium text-white/85 backdrop-blur-md transition-colors hover:border-white/45 hover:text-white"
              >
                Back to the atlas
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* 3D map of the state */}
      {showMap ? (
        <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8">
          <div className="glass relative overflow-hidden rounded-[30px] p-3">
            <div className="relative h-[340px] overflow-hidden rounded-[24px] sm:h-[460px]">
              <India3D
                className="absolute inset-0"
                selectedId={state.id}
                focusId={state.id}
                fov={38}
                elevation={54}
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/65 backdrop-blur-md">
                {state.name} in 3D
              </div>
              <button
                onClick={() => setShowMap(false)}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-ink-950/60 text-white/70 backdrop-blur-md transition-colors hover:text-white"
                aria-label="Hide 3D map"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {/* body */}
      <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="space-y-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Capital" value={state.capital} />
              <Stat label="Area" value={`${state.areaKm2.toLocaleString('en-IN')} km²`} />
              <Stat label="Population" value={`~${state.populationCrore} crore`} />
              <Stat label="Best months" value={state.bestMonths} />
            </div>

            <div>
              <SectionHeading
                align="left"
                kicker="Festivals"
                title="The"
                highlight="calendar"
                description={`${state.name} keeps time differently — and the year is marked by these days.`}
              />
              <ul className="mt-6 space-y-3">
                {state.festivals.map((f) => (
                  <li
                    key={f.name}
                    className="glass flex flex-col gap-1 rounded-2xl px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-5"
                  >
                    <span
                      className="shrink-0 text-[10px] uppercase tracking-[0.18em]"
                      style={{ color: accent }}
                    >
                      {f.when}
                    </span>
                    <span className="text-[14px] font-medium text-white">{f.name}</span>
                    <span className="text-[13px] leading-relaxed text-white/55">{f.note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading
                align="left"
                kicker="Landmarks"
                title="Where to —"
                highlight="stand"
                description="Three places that explain the rest."
              />
              <div className="mt-6 space-y-4">
                {state.landmarks.map((l, i) => (
                  <motion.div
                    key={l.name}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="glass flex items-start gap-4 rounded-2xl px-4 py-4"
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-sm"
                      style={{ background: `${accent}25`, color: accent }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="text-[14.5px] font-medium text-white">{l.name}</div>
                      <div className="mt-0.5 text-[13px] leading-relaxed text-white/55">{l.note}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="glass rounded-[26px] p-6">
              <ChipList title="Signature dishes" items={state.cuisine} />
              <div className="my-6 divider-glow" />
              <ChipList title="Art & craft" items={state.artForms} />
            </div>

            <div className="glass rounded-[26px] p-6">
              <h3 className="text-[10px] uppercase tracking-[0.24em] text-white/40">Nature & wildlife</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">{state.nature}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Stat label="State animal" value={state.stateAnimal} />
                <Stat label="State bird" value={state.stateBird} />
              </div>
            </div>

            <div
              className="rounded-[26px] border p-6"
              style={{ borderColor: `${accent}44`, background: `${accent}12` }}
            >
              <h3 className="text-[10px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                Local tip
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">{state.guideTip}</p>
            </div>

            {panoramas.length ? (
              <div className="glass rounded-[26px] p-6">
                <h3 className="text-[10px] uppercase tracking-[0.24em] text-white/40">
                  360° scenes here
                </h3>
                <div className="mt-4 space-y-3">
                  {panoramas.map((p) => (
                    <a
                      key={p.slug}
                      href={`/panorama/${p.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3"
                    >
                      <img
                        src={`/images/${state.image}.jpg`}
                        alt=""
                        loading="lazy"
                        className="h-12 w-16 rounded-lg object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] text-white/85">{p.name}</span>
                        <span className="block text-[11px] text-white/40">{p.place}</span>
                      </span>
                      <span className="text-saffron-300 transition-transform group-hover:translate-x-0.5">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </article>
  );
}
