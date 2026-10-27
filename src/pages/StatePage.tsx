import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Compass, Sparkles, X, MapPin, Calendar, Navigation } from 'lucide-react';
import { STATE_BY_ID } from '../data/states';
import { PANORAMAS_BY_STATE } from '../data/panoramas';
import { CULTURAL_DATA_BY_STATE, type CulturalPillar } from '../data/culturalData';
import { India3D } from '../components/India3D';
import { SectionHeading } from '../components/Atmosphere';
import { SafeImage } from '../components/SafeImage';
import { AudioNarrationBar } from '../components/AudioNarrationBar';
import { imagePath } from '../lib/assets';
import { useLanguage } from '../lib/i18n';
import { setLiveView } from '../lib/liveView';

const hash = (s: string) => s.split('').reduce((a, c) => a + c.charCodeAt(0), 0);

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-parchment-200/10 bg-white/[0.03] px-4 py-3.5">
      <div className="text-[12px] text-parchment-200/50">{label}</div>
      <div className="mt-1 font-display text-lg font-light leading-tight text-parchment-100">{value}</div>
    </div>
  );
}

function ChipList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[12px] text-parchment-200/50">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((i) => (
          <span
            key={i}
            className="chip border border-parchment-200/10 bg-white/5 text-parchment-200/75 transition-colors hover:border-saffron-300/40 hover:text-parchment-100"
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
  const navigate = useNavigate();
  const { t } = useLanguage();
  const state = STATE_BY_ID[id];
  const culture = CULTURAL_DATA_BY_STATE[id];
  const [showMap, setShowMap] = useState(true);
  const [selectedPillar, setSelectedPillar] = useState<CulturalPillar | null>(null);

  const panoramas = useMemo(() => PANORAMAS_BY_STATE[id] ?? [], [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

  useEffect(() => {
    if (!state) return;
    setLiveView({
      description: `The visitor is exploring ${state.name}, ${state.tagline}. Capital: ${state.capital}. Cultural pillars include traditional attire, food (${state.cuisine.slice(0, 3).join(', ')}), art & crafts, festivals, and hidden gems.`,
    });
  }, [state]);

  if (!state) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl font-light text-parchment-100">That state is not on the map</h1>
        <p className="mt-3 text-parchment-200/50">Try one of the 28 states or 8 union territories.</p>
        <Link
          to="/explore"
          className="mt-6 rounded-full bg-saffron-400 hover:bg-saffron-300 px-6 py-3 text-sm font-semibold text-ink-950"
        >
          {t('backToAtlas')}
        </Link>
      </div>
    );
  }

  const variant = hash(state.id) % 4;
  const accent = state.accent;
  const reverse = variant === 1 || variant === 3;

  // Narration text compilation
  const narrationScript = useMemo(() => {
    const parts = [
      `${state.name}, ${state.tagline}.`,
      state.vibe,
      `Capital is ${state.capital}, with a population of approximately ${state.populationCrore} crore.`,
    ];
    if (culture) {
      parts.push(`In traditional attire: ${culture.attire.title}. ${culture.attire.summary}`);
      parts.push(`Famous food includes ${culture.food.title}. ${culture.food.summary}`);
      parts.push(`Master crafts: ${culture.craft.title}. ${culture.craft.summary}`);
      parts.push(`Key traditions and festivals: ${culture.festivals.title}. ${culture.festivals.summary}`);
      parts.push(`Featured hidden gem is ${culture.hiddenGem.title} located at ${culture.hiddenGem.location || state.name}. ${culture.hiddenGem.summary}`);
    }
    return parts.join(' ');
  }, [state, culture]);

  const culturalPillarsList: CulturalPillar[] = culture
    ? [culture.attire, culture.food, culture.craft, culture.festivals]
    : [];

  return (
    <article className="pb-24">
      {/* Breadcrumb Navigation & Back Button */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3">
          <ol className="flex items-center gap-2 text-xs text-parchment-200/60">
            <li>
              <Link to="/" className="hover:text-parchment-100 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={13} className="text-parchment-200/30" />
            </li>
            <li>
              <Link to="/explore" className="hover:text-parchment-100 transition-colors">
                Atlas
              </Link>
            </li>
            <li>
              <ChevronRight size={13} className="text-parchment-200/30" />
            </li>
            <li className="font-medium text-saffron-400 truncate max-w-[200px]" aria-current="page">
              {state.name}
            </li>
          </ol>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-parchment-200/15 bg-ink-950/60 px-3.5 py-1.5 text-xs text-parchment-200/80 backdrop-blur-md transition-colors hover:border-saffron-400/50 hover:text-parchment-100"
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header
        className={`relative overflow-hidden ${variant === 2 ? 'h-[62vh] min-h-[440px]' : 'min-h-[76vh]'}`}
      >
        <SafeImage
          src={imagePath(state.image)}
          alt={state.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/70" />
        <div
          className="absolute inset-0 opacity-55 mix-blend-overlay"
          style={{ background: `linear-gradient(140deg, ${accent}66, transparent 60%)` }}
        />

        <div className="relative mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-end px-5 pb-14 pt-16 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={reverse ? 'max-w-xl lg:ml-auto lg:text-right' : 'max-w-2xl'}
          >
            <div className={`flex items-center gap-2 ${reverse ? 'lg:justify-end' : ''}`}>
              <span
                className="rounded-full px-2.5 py-1 text-[12px] font-semibold text-ink-950"
                style={{ background: accent }}
              >
                {state.type === 'UT' ? 'Union Territory' : 'State'}
              </span>
              <span className="rounded-full border border-white/25 bg-ink-950/45 px-2.5 py-1 text-[12px] text-parchment-200/75 backdrop-blur-md">
                {state.region}
              </span>
              <span className="rounded-full border border-white/25 bg-ink-950/45 px-2.5 py-1 text-[12px] text-parchment-200/75 backdrop-blur-md">
                Est. {state.formed}
              </span>
            </div>

            <h1 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight text-parchment-100 sm:text-7xl">
              {state.name}
            </h1>
            <p className="mt-3 text-lg italic text-parchment-200/70">{state.tagline}</p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-parchment-200/70">{state.vibe}</p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {panoramas.map((p) => (
                <Link
                  key={p.slug}
                  to={`/panorama/${p.slug}`}
                  className="sheen inline-flex items-center gap-2 rounded-full bg-saffron-400 hover:bg-saffron-300 px-5 py-2.5 text-[13px] font-semibold text-ink-950 transition-colors shadow-lg"
                >
                  <Compass size={15} />
                  360° · {p.name}
                  <span aria-hidden>↗</span>
                </Link>
              ))}
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-ink-950/40 px-5 py-2.5 text-[13px] font-medium text-parchment-100 backdrop-blur-md transition-colors hover:border-white/45 hover:text-parchment-100"
              >
                {t('backToAtlas')}
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Guide Audio Narration Section */}
      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <AudioNarrationBar textToNarrate={narrationScript} title={state.name} />
      </section>

      {/* 5 CULTURAL CATEGORIES (REQUIRED BY SPECIFICATION) */}
      {culture && (
        <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8" aria-labelledby="cultural-pillars">
          <SectionHeading
            align="left"
            kicker="Cultural Heritage"
            title="Five Pillars of"
            highlight={state.name}
            description="Explore authentic traditional attire, famous cuisine, master art and crafts, regional traditions and festivals, and one highlighted hidden gem."
          />

          {/* 1. HIGHLIGHTED HIDDEN GEM SHOWCASE BANNER */}
          <div className="mt-10 overflow-hidden rounded-[28px] border border-saffron-400/40 bg-gradient-to-br from-saffron-950/40 via-ink-900/90 to-ink-950 p-6 sm:p-8 shadow-[0_20px_50px_rgba(242,169,59,0.12)]">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="relative h-64 w-full lg:w-2/5 shrink-0 overflow-hidden rounded-2xl border border-parchment-200/15">
                <SafeImage
                  src={imagePath(state.image)}
                  alt={culture.hiddenGem.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-saffron-400 px-3 py-1 text-xs font-bold text-ink-950 shadow-md">
                  <Sparkles size={13} />
                  {t('hiddenGem')}
                </span>
                {culture.hiddenGem.location && (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-ink-950/75 px-2.5 py-1 text-[11px] text-parchment-200/80 backdrop-blur-md">
                    <MapPin size={11} className="text-saffron-400" />
                    {culture.hiddenGem.location}
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-saffron-400 font-semibold">
                    Unexplored Wonder
                  </span>
                  <h3 className="font-display text-3xl font-light text-parchment-100">
                    {culture.hiddenGem.title}
                  </h3>
                </div>

                <p className="text-[14.5px] leading-relaxed text-parchment-200/80">
                  {culture.hiddenGem.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-parchment-200/70">
                  {culture.hiddenGem.howToReach && (
                    <div className="flex items-start gap-2 rounded-xl bg-white/[0.03] p-2.5 border border-white/5">
                      <Navigation size={14} className="text-saffron-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-parchment-100">How to Reach:</strong>
                        <span>{culture.hiddenGem.howToReach}</span>
                      </div>
                    </div>
                  )}
                  {culture.hiddenGem.bestTimeToVisit && (
                    <div className="flex items-start gap-2 rounded-xl bg-white/[0.03] p-2.5 border border-white/5">
                      <Calendar size={14} className="text-saffron-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-parchment-100">Best Time:</strong>
                        <span>{culture.hiddenGem.bestTimeToVisit}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPillar(culture.hiddenGem)}
                    className="sheen inline-flex items-center gap-2 rounded-full bg-saffron-400 hover:bg-saffron-300 px-5 py-2.5 text-xs font-semibold text-ink-950 transition-colors"
                  >
                    <span>{t('readMore')} & Practical Guide</span>
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2-5: FOUR CORE CULTURAL PILLARS GRID */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {culturalPillarsList.map((pillar) => (
              <motion.div
                key={pillar.category}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="glass group flex flex-col justify-between overflow-hidden rounded-2xl border border-parchment-200/10 transition-colors hover:border-saffron-400/40"
              >
                <div className="relative h-44 overflow-hidden">
                  <SafeImage
                    src={imagePath(state.image)}
                    alt={pillar.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-[11px] font-medium text-saffron-300 backdrop-blur-md border border-white/10">
                    {pillar.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="space-y-2">
                    <h4 className="font-display text-lg font-medium text-parchment-100 group-hover:text-saffron-300 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-parchment-200/65 line-clamp-3">
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setSelectedPillar(pillar)}
                      className="inline-flex w-full items-center justify-between text-xs font-semibold text-saffron-400 hover:text-saffron-300 transition-colors"
                    >
                      <span>{t('readMore')}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 3D Map Embedded for the State */}
      {showMap && (
        <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
          <div className="glass relative overflow-hidden rounded-[30px] p-3">
            <div className="relative h-[340px] overflow-hidden rounded-[24px] sm:h-[460px]">
              <India3D
                className="absolute inset-0"
                selectedId={state.id}
                focusId={state.id}
                fov={38}
                elevation={54}
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-parchment-200/20 bg-ink-950/60 px-3 py-1.5 text-[12px] text-parchment-200/65 backdrop-blur-md">
                {state.name} in 3D
              </div>
              <button
                type="button"
                onClick={() => setShowMap(false)}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-parchment-200/20 bg-ink-950/60 text-parchment-200/70 backdrop-blur-md transition-colors hover:text-parchment-100"
                aria-label="Hide 3D map"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* State Body Information: Demographics, Festivals, Landmarks, Nature */}
      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
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
                description={`${state.name} marks time through seasons, devotion, and community.`}
              />
              <ul className="mt-6 space-y-3">
                {state.festivals.map((f) => (
                  <li
                    key={f.name}
                    className="glass flex flex-col gap-1 rounded-2xl px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-5"
                  >
                    <span className="shrink-0 text-[12px]" style={{ color: accent }}>
                      {f.when}
                    </span>
                    <span className="text-[14px] font-medium text-parchment-100">{f.name}</span>
                    <span className="text-[13px] leading-relaxed text-parchment-200/55">{f.note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RELATED ATTRACTIONS & MONUMENTS SECTION */}
            <div>
              <SectionHeading
                align="left"
                kicker="Related Attractions"
                title="Historic"
                highlight="monuments"
                description="Iconic architectural and natural landmarks from across this region."
              />
              <div className="mt-6 space-y-4">
                {culture?.relatedMonuments.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="glass flex items-start justify-between gap-4 rounded-2xl p-4 transition-colors hover:border-saffron-400/30"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-sm font-semibold"
                        style={{ background: `${accent}25`, color: accent }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[14.5px] font-medium text-parchment-100">{m.name}</span>
                          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-parchment-200/50">
                            {m.type}
                          </span>
                        </div>
                        <div className="mt-0.5 text-[13px] leading-relaxed text-parchment-200/60">{m.note}</div>
                      </div>
                    </div>

                    {m.panoramaSlug && (
                      <Link
                        to={`/panorama/${m.panoramaSlug}`}
                        className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-saffron-400/15 hover:bg-saffron-400/30 px-3 py-1.5 text-xs font-semibold text-saffron-300 border border-saffron-400/30 transition-colors"
                      >
                        <Compass size={13} />
                        <span>360°</span>
                      </Link>
                    )}
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
              <h3 className="text-[12px] text-parchment-200/50">Nature & wildlife</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-parchment-200/65">{state.nature}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Stat label="State animal" value={state.stateAnimal} />
                <Stat label="State bird" value={state.stateBird} />
              </div>
            </div>

            <div
              className="rounded-[26px] border p-6"
              style={{ borderColor: `${accent}44`, background: `${accent}12` }}
            >
              <h3 className="text-[12px]" style={{ color: accent }}>
                Local tip
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-parchment-200/80">{state.guideTip}</p>
            </div>

            {panoramas.length > 0 && (
              <div className="glass rounded-[26px] p-6">
                <h3 className="text-[12px] text-parchment-200/50">
                  360° scenes here
                </h3>
                <div className="mt-4 space-y-3">
                  {panoramas.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/panorama/${p.slug}`}
                      className="group flex items-center gap-3"
                    >
                      <SafeImage
                        src={imagePath(state.image)}
                        alt=""
                        loading="lazy"
                        className="h-12 w-16 rounded-lg object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] text-parchment-100">{p.name}</span>
                        <span className="block text-[12.5px] text-parchment-200/50">{p.place}</span>
                      </span>
                      <span className="text-saffron-300 transition-transform group-hover:translate-x-0.5">↗</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* READ MORE MODAL / DRAWER FOR CULTURAL PILLARS */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPillar(null)}
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-parchment-200/20 bg-ink-900 shadow-2xl backdrop-blur-2xl"
            >
              <div className="relative h-48 sm:h-56">
                <SafeImage
                  src={imagePath(state.image)}
                  alt={selectedPillar.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => setSelectedPillar(null)}
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ink-950/70 text-parchment-100 backdrop-blur-md hover:bg-ink-950 transition-colors border border-white/10"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="rounded-full bg-saffron-400 px-3 py-1 text-xs font-bold text-ink-950">
                    {selectedPillar.category}
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-light text-parchment-100">
                    {selectedPillar.title}
                  </h3>
                </div>
              </div>

              <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6 text-sm text-parchment-200/80">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-saffron-400 font-semibold">
                    Historical Origins & Roots
                  </h4>
                  <p className="mt-1.5 leading-relaxed text-parchment-100">
                    {selectedPillar.readMore.originAndHistory}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-saffron-400 font-semibold">
                    Cultural Significance
                  </h4>
                  <p className="mt-1.5 leading-relaxed text-parchment-100">
                    {selectedPillar.readMore.culturalSignificance}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-saffron-400 font-semibold">
                    Practical & Visitor Advice
                  </h4>
                  <p className="mt-1.5 leading-relaxed text-parchment-100">
                    {selectedPillar.readMore.visitorOrPracticalInfo}
                  </p>
                </div>

                {selectedPillar.howToReach && (
                  <div className="rounded-xl bg-white/[0.04] p-3.5 border border-white/5">
                    <h5 className="text-xs font-semibold text-parchment-100">Travel Instructions</h5>
                    <p className="mt-1 text-xs text-parchment-200/70">{selectedPillar.howToReach}</p>
                  </div>
                )}

                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedPillar(null)}
                    className="rounded-full bg-parchment-100 hover:bg-white px-5 py-2 text-xs font-semibold text-ink-950 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </article>
  );
}
