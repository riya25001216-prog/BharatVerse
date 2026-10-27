import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { India3D } from '../components/India3D';
import { SectionHeading } from '../components/Atmosphere';
import { CulturalDiscoveries } from '../components/CulturalDiscoveries';
import { Guide3D } from '../components/Guide3D';
import { Stories } from '../components/Stories';
import { TripPlanner } from '../components/TripPlanner';
import { SafeImage } from '../components/SafeImage';
import { imagePath, panoramaPath } from '../lib/assets';
import { STATE_STORIES, REGION_COLORS } from '../data/states';
import { PANORAMA_BY_SLUG, PANORAMA_PLACES } from '../data/panoramas';
import { useAsk } from '../lib/ask';
import { MeetTara } from '../components/MeetTara';

export function HomePage() {
  const ask = useAsk();
  const navigate = useNavigate();
  const featured = PANORAMA_BY_SLUG['gateway-of-india'];
  const scenes = [...PANORAMA_PLACES]
    .filter((p) => p.slug !== featured?.slug)
    .sort((a, b) => Number(b.kind === 'sphere') - Number(a.kind === 'sphere'))
    .slice(0, 12);
  return (
    <>
      <Hero />

      <MeetTara />

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
                  if (id) navigate('/state/' + id);
                }}
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-parchment-200/15 bg-ink-950/70 px-3.5 py-1.5 text-[12px] text-parchment-200/80 backdrop-blur-md">
                Drag to turn the map, click a state to open it
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/explore"
              className="btn-primary !px-7 !py-3.5"
            >
              Open the full atlas
            </Link>
            <Link
              to="/guide"
              className="btn-ghost !px-7 !py-3.5"
            >
              Watch the 3D guide
            </Link>
          </div>
        </div>
      </section>

      {/* 360 scenes: one large featured scene, then a strip */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="left"
            kicker="Step inside"
            title="Stand in the middle"
            highlight="of the place"
            description={`${PANORAMA_PLACES.filter((p) => p.kind === 'sphere').length} full 360° scenes you can turn all the way around in, plus wide views of the great monuments. Drag to look, scroll to zoom.`}
          />
          {featured ? (
            <Link
              to={'/panorama/' + featured.slug}
              className="group relative mt-12 block overflow-hidden rounded-[28px] border border-parchment-200/10"
            >
              <SafeImage
                src={panoramaPath(featured.slug)}
                alt=""
                loading="lazy"
                className="h-[340px] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] sm:h-[460px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-9">
                <div>
                  <div className="text-[14px] text-saffron-300">360° view · {featured.place}</div>
                  <div className="mt-1 font-display text-4xl font-light text-parchment-100 sm:text-5xl">{featured.name}</div>
                  <p className="mt-2 max-w-lg text-[15px] text-parchment-200/75">{featured.caption}</p>
                </div>
                <span className="btn-primary shrink-0 !px-7 !py-3.5">Step inside</span>
              </div>
            </Link>
          ) : null}
          <div className="no-scrollbar -mx-5 mt-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
            {scenes.map((p) => (
              <Link
                key={p.slug}
                to={'/panorama/' + p.slug}
                className="group relative w-[240px] shrink-0 snap-start overflow-hidden rounded-[20px] border border-parchment-200/10 transition-colors hover:border-saffron-400/50 sm:w-[270px]"
              >
                <SafeImage
                  src={panoramaPath(p.slug)}
                  alt=""
                  loading="lazy"
                  className="h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-[12px] text-saffron-300">{p.kind === 'sphere' ? '360° view' : 'Wide view'}</div>
                  <div className="mt-0.5 font-display text-xl text-parchment-100">{p.name}</div>
                </div>
              </Link>
            ))}
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
            <Guide3D onOpenPanorama={(slug) => navigate('/panorama/' + slug)} />
          </div>
        </div>
      </section>

      <Stories onAsk={ask} />

      {/* plan your trip */}
      <TripPlanner />

      {/* states strip */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            kicker="36 destinations"
            title="Every state,"
            highlight="one story each"
          />
          <div className="mt-6 flex justify-center">
            <Link to="/destinations" className="btn-ghost">
              See all with filters
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {STATE_STORIES.map((s) => (
              <Link
                key={s.id}
                to={'/state/' + s.id}
                className="group relative overflow-hidden rounded-2xl border border-parchment-200/10 transition-colors hover:border-saffron-400/45"
              >
                <SafeImage
                  src={imagePath(s.image)}
                  alt={s.name}
                  loading="lazy"
                  className="h-32 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: REGION_COLORS[s.region] }}
                  />
                  <span className="truncate text-[14px] font-semibold text-parchment-100">{s.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
