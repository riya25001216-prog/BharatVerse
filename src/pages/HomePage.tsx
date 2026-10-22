import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { India3D } from '../components/India3D';
import { SectionHeading } from '../components/Atmosphere';
import { CulturalDiscoveries } from '../components/CulturalDiscoveries';
import { Guide3D } from '../components/Guide3D';
import { Stories } from '../components/Stories';
import { TripPlanner } from '../components/TripPlanner';
import { STATE_STORIES, REGION_COLORS } from '../data/states';
import { PANORAMA_PLACES } from '../data/panoramas';

export function HomePage({ onAsk }: { onAsk?: (question: string) => void } = {}) {
  const ask = onAsk ?? (() => {});
  return (
    <>
      <Hero />

      {/* 3D teaser / interactive map */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            kicker="Live in three dimensions"
            title="A map you can"
            highlight="turn over"
            description="The atlas is a solid object: every state extruded, lit and waiting. Click any state to open its own page."
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="glass relative mt-12 overflow-hidden rounded-[34px] p-3"
          >
            <div className="relative h-[420px] overflow-hidden rounded-[26px] sm:h-[620px]">
              <India3D
                className="absolute inset-0"
                fov={40}
                elevation={50}
                onSelect={(id) => {
                  if (id) window.open('/state/' + id, '_blank');
                }}
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/65 backdrop-blur-md">
                Click a state to open its own page
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/explore"
              className="sheen rounded-full bg-[linear-gradient(90deg,#ffc46b,#f98a09)] px-7 py-3.5 text-sm font-semibold text-ink-950"
            >
              Open the atlas
            </Link>
            <Link
              to="/guide"
              className="glass rounded-full px-7 py-3.5 text-sm font-semibold text-white/85 transition-colors hover:text-white"
            >
              Watch the 3D guide
            </Link>
          </div>
        </div>
      </section>

      <CulturalDiscoveries onHear={ask} />

      {/* meet your guide */}
      <section id="guide" className="scroll-mt-24 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            kicker="The virtual guide"
            title="Travel the route in"
            highlight="three dimensions"
            description="A live 3D atlas with the route drawn across it, a marker that moves as the story plays, and a 360 scene waiting at every stop."
          />
          <div className="mt-12">
            <Guide3D onOpenPanorama={(slug) => window.open('/panorama/' + slug, '_blank')} />
          </div>
        </div>
      </section>

      <Stories onAsk={ask} />

      {/* plan your trip */}
      <TripPlanner />

      {/* 360 panoramas teaser */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            kicker="Captured in 360"
            title="Stand inside"
            highlight="the place"
            description={PANORAMA_PLACES.length + ' real panoramas of Indian monuments and landscapes, each one drag-to-look.'}
          />
          <div className="no-scrollbar mt-12 flex gap-4 overflow-x-auto pb-4">
            {PANORAMA_PLACES.slice(0, 12).map((p) => (
              <Link
                key={p.slug}
                to={'/panorama/' + p.slug}
                className="group relative w-[260px] shrink-0 overflow-hidden rounded-3xl border border-white/10 transition-all hover:border-saffron-300/50 sm:w-[300px]"
              >
                <img
                  src={'/panoramas/' + p.slug + '.jpg'}
                  alt={p.name}
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-saffron-300/85">{p.place}</div>
                  <div className="mt-1 font-display text-lg font-light text-white">{p.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* states strip */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            kicker="36 destinations"
            title="Every state,"
            highlight="one story each"
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {STATE_STORIES.map((s) => (
              <Link
                key={s.id}
                to={'/state/' + s.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 transition-all hover:border-white/30"
              >
                <img
                  src={'/images/' + s.image + '.jpg'}
                  alt={s.name}
                  loading="lazy"
                  className="h-28 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: REGION_COLORS[s.region] }}
                  />
                  <span className="truncate text-[13px] font-medium text-white">{s.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
