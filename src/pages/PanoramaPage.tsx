import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Panorama3D } from '../components/Panorama3D';
import { PANORAMA_BY_SLUG, PANORAMA_PLACES } from '../data/panoramas';
import { STATE_BY_ID } from '../data/states';

export function PanoramaPage() {
  const { slug = '' } = useParams();
  const place = PANORAMA_BY_SLUG[slug];
  const [hotspot, setHotspot] = useState<{ lat: number; lng: number; label: string; note: string } | null>(
    null
  );
  const [infoOpen, setInfoOpen] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setHotspot(null);
  }, [slug]);

  const nearby = useMemo(() => {
    if (!place) return [];
    return PANORAMA_PLACES.filter((p) => p.slug !== place.slug).slice(0, 6);
  }, [place]);

  if (!place) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl font-light text-white">No scene captured here yet</h1>
        <Link
          to="/explore"
          className="mt-6 rounded-full bg-[linear-gradient(90deg,#ffc46b,#f98a09)] px-6 py-3 text-sm font-semibold text-ink-950"
        >
          Back to the atlas
        </Link>
      </div>
    );
  }

  const state = STATE_BY_ID[place.stateId];
  const hotspots = [
    {
      lat: place.lat,
      lng: place.lng,
      label: 'Viewpoint',
      note: `This scene was captured at ${place.lat.toFixed(4)}°, ${place.lng.toFixed(4)}°.`,
    },
  ];

  return (
    <section className="pb-24">
      <div className="relative h-[70vh] min-h-[480px]">
        <Panorama3D
          className="absolute inset-0"
          url={`/panoramas/${place.slug}.jpg`}
          kind={place.kind}
          lat={place.lat}
          lng={place.lng}
          title={place.name}
          hotspots={hotspots}
          onHotspot={setHotspot}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 top-16 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="pointer-events-auto">
            <div className="inline-flex rounded-full border border-white/15 bg-ink-950/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
              360° live scene
            </div>
            <h1 className="mt-3 font-display text-4xl font-light leading-none text-white sm:text-6xl">
              {place.name}
            </h1>
            <p className="mt-2 text-[14px] text-white/65">
              {place.place} · {place.lat.toFixed(4)}°, {place.lng.toFixed(4)}°
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="glass rounded-[26px] p-6">
              <p className="text-[15px] leading-relaxed text-white/80">{place.story}</p>
              <p className="mt-3 text-[13.5px] italic text-white/45">{place.caption}</p>

              <AnimatePresence>
                {hotspot ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 rounded-2xl border border-saffron-300/25 bg-saffron-400/[0.08] p-4"
                  >
                    <div className="text-[10px] uppercase tracking-[0.2em] text-saffron-300/85">
                      {hotspot.label}
                    </div>
                    <div className="mt-1 text-[13px] text-white/80">{hotspot.note}</div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {place.facts.map((f) => (
                <div key={f} className="glass rounded-2xl px-4 py-3.5 text-[13px] text-white/75">
                  {f}
                </div>
              ))}
            </div>

            <div className="glass rounded-[26px] p-6">
              <h3 className="text-[10px] uppercase tracking-[0.24em] text-white/40">
                More scenes to walk into
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {nearby.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/panorama/${p.slug}`}
                    target="_blank"
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 p-2 transition-colors hover:border-white/30"
                  >
                    <img
                      src={`/panoramas/${p.slug}.jpg`}
                      alt=""
                      loading="lazy"
                      className="h-14 w-20 rounded-xl object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] text-white/85">{p.name}</span>
                      <span className="block truncate text-[11px] text-white/40">{p.place}</span>
                    </span>
                    <span className="pr-1 text-saffron-300">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            {state ? (
              <Link
                to={`/state/${state.id}`}
                target="_blank"
                className="glass card-hover block overflow-hidden rounded-[26px]"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={`/images/${state.image}.jpg`}
                    alt={state.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-saffron-300/85">
                      This scene is in
                    </div>
                    <div className="font-display text-xl font-light text-white">{state.name}</div>
                  </div>
                </div>
                <div className="p-4 text-[12.5px] leading-relaxed text-white/55">{state.vibe}</div>
              </Link>
            ) : null}

            <button
              onClick={() => setInfoOpen((v) => !v)}
              className="glass w-full rounded-[26px] p-5 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">
                  How this scene works
                </span>
                <span className="text-white/40">{infoOpen ? '−' : '+'}</span>
              </div>
              <AnimatePresence>
                {infoOpen ? (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-2.5 overflow-hidden text-[12.5px] leading-relaxed text-white/55"
                  >
                    <li>· Drag anywhere to look around the real photograph.</li>
                    <li>· Scroll to zoom the field of view.</li>
                    <li>· The compass shows the heading you are facing, in degrees.</li>
                    <li>· The coordinates are the exact viewpoint of the capture.</li>
                    <li>
                      · {place.kind === 'sphere'
                        ? 'This is a true equirectangular capture, wrapped on a sphere.'
                        : 'This is a wide stitched panorama, wrapped on a cylinder.'}
                    </li>
                  </motion.ul>
                ) : null}
              </AnimatePresence>
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
