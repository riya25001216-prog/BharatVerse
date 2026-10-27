import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Eye, MessageCircle, ArrowLeft, ChevronRight, Compass, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Panorama3D } from '../components/Panorama3D';
import { PANORAMA_BY_SLUG, PANORAMA_PLACES } from '../data/panoramas';
import { STATE_BY_ID } from '../data/states';
import { SafeImage } from '../components/SafeImage';
import { AudioNarrationBar } from '../components/AudioNarrationBar';
import { useGuide } from '../lib/ask';
import { panoramaPath, imagePath } from '../lib/assets';
import { useLanguage } from '../lib/i18n';
import { setLiveView } from '../lib/liveView';

export function PanoramaPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const place = PANORAMA_BY_SLUG[slug];
  const { ask, explainView } = useGuide();
  const { t } = useLanguage();
  const captureRef = useRef<(() => Promise<Blob | null>) | null>(null);
  const [facing, setFacing] = useState('N');
  const [showReadMore, setShowReadMore] = useState(false);
  const onFacing = useCallback((c: string) => setFacing(c), []);

  // Update live view context for the virtual guide
  useEffect(() => {
    if (!place) return;
    const words: Record<string, string> = {
      N: 'north',
      NE: 'north-east',
      E: 'east',
      SE: 'south-east',
      S: 'south',
      SW: 'south-west',
      W: 'west',
      NW: 'north-west',
    };
    const view =
      place.kind === 'sphere'
        ? `the 360-degree equirectangular view of ${place.name}, facing ${words[facing] || facing}`
        : `a high-resolution wide view of ${place.name}`;
    setLiveView({
      description: `The visitor is looking at ${view}, in ${place.place}. ${place.caption} ${place.story} Key facts: ${place.facts.join('; ')}.`,
      capture: () => captureRef.current?.() ?? Promise.resolve(null),
    });
  }, [place, facing]);

  const more = useMemo(() => {
    if (!place) return [];
    const sameState = PANORAMA_PLACES.filter((p) => p.slug !== place.slug && p.stateId === place.stateId);
    const rest = PANORAMA_PLACES.filter((p) => p.slug !== place.slug && p.stateId !== place.stateId);
    rest.sort((a, b) => Number(b.kind === 'sphere') - Number(a.kind === 'sphere'));
    return [...sameState, ...rest].slice(0, 8);
  }, [place]);

  if (!place) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-saffron-400/20 text-saffron-400 border border-saffron-400/30">
          <Compass size={32} className="animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <h1 className="font-display text-4xl font-light text-parchment-100">Looking for a 360° Scene?</h1>
        <p className="mt-3 text-parchment-200/70 max-w-md">
          Explore all 38 supported historical monuments, sacred temples, and coastal fortresses across India.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/panoramas" className="btn-primary !px-7 !py-3.5 text-sm">
            Browse All 38 360° Panoramas ↗
          </Link>
          <Link to="/" className="btn-ghost !px-6 !py-3.5 text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const state = STATE_BY_ID[place.stateId];

  const narrationScript = useMemo(() => {
    return `${place.name} in ${place.place}. ${place.caption}. ${place.story}. Key facts include: ${place.facts.join('. ')}.`;
  }, [place]);

  return (
    <article className="pb-20">
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
              <Link to="/panoramas" className="hover:text-parchment-100 transition-colors">
                {t('panoramas')}
              </Link>
            </li>
            <li>
              <ChevronRight size={13} className="text-parchment-200/30" />
            </li>
            <li className="font-medium text-saffron-400 truncate max-w-[200px]" aria-current="page">
              {place.name}
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

      {/* 360° Hero Stage */}
      <div className="relative h-[88vh] min-h-[580px] w-full">
        <Panorama3D
          className="h-full w-full"
          url={panoramaPath(place.slug)}
          kind={place.kind}
          title={place.name}
          captureRef={captureRef}
          onFacingChange={onFacing}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-saffron-400 px-3 py-1 text-xs font-semibold text-ink-950 shadow-md">
              {place.kind === 'sphere' ? '360° Equirectangular Sphere' : 'Panoramic Cylindrical View'}
            </span>
            <span className="rounded-full border border-white/20 bg-ink-950/60 px-3 py-1 text-xs text-parchment-200/80 backdrop-blur-md">
              {place.place}
            </span>
          </div>

          <h1 className="mt-2 max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-parchment-100">
            {place.name}
          </h1>
          <p className="mt-2.5 max-w-xl text-[15px] italic text-parchment-200/80">{place.caption}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={explainView}
              className="btn-primary pointer-events-auto !px-5 !py-2.5 shadow-[0_12px_40px_-10px_rgba(242,169,59,0.8)]"
            >
              <Eye size={16} />
              <span>Ask Tara to explain this view</span>
            </button>
            <button
              type="button"
              onClick={() => setShowReadMore(true)}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-parchment-200/20 bg-ink-950/60 px-4 py-2.5 text-xs font-semibold text-parchment-100 backdrop-blur-md transition-colors hover:border-saffron-400/50"
            >
              <Info size={15} />
              <span>Read Historical Context</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guide Audio Narration Section */}
      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <AudioNarrationBar textToNarrate={narrationScript} title={place.name} />
      </section>

      {/* Monument Story & Key Facts */}
      <div className="mx-auto mt-12 grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div>
          <h2 className="text-xs uppercase tracking-wider text-saffron-400 font-semibold">
            Historical Story
          </h2>
          <p className="mt-3 max-w-2xl font-display text-2xl font-light leading-snug text-parchment-100 sm:text-[1.75rem]">
            {place.story}
          </p>

          <h3 className="mt-8 text-xs uppercase tracking-wider text-parchment-200/50 font-semibold">
            Key Architecture & Heritage Facts
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {place.facts.map((f) => (
              <li
                key={f}
                className="glass rounded-xl border-l-2 border-saffron-400 p-3.5 text-[14px] leading-snug text-parchment-200/85"
              >
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => ask(`Tell me about ${place.name} in ${place.place}`)}
              className="sheen inline-flex items-center gap-2 rounded-full bg-saffron-400 hover:bg-saffron-300 px-5 py-2.5 text-xs font-semibold text-ink-950 transition-colors"
            >
              <MessageCircle size={15} />
              <span>Ask Tara about this monument</span>
            </button>
            <button
              type="button"
              onClick={() => setShowReadMore(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-parchment-200/20 px-4 py-2.5 text-xs font-medium text-parchment-200/80 hover:text-parchment-100 hover:border-white/30 transition-colors"
            >
              <span>{t('readMore')} Details</span>
            </button>
          </div>
        </div>

        {state ? (
          <Link
            to={`/state/${state.id}`}
            className="group block overflow-hidden rounded-[24px] border border-parchment-200/10 bg-ink-800 transition-all hover:border-saffron-400/50 hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <SafeImage
                src={imagePath(state.image)}
                alt={state.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-[12px] uppercase tracking-wider text-saffron-300 font-semibold">
                  Region & Heritage
                </div>
                <div className="font-display text-2xl text-parchment-100">{state.name}</div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-[13.5px] leading-relaxed text-parchment-200/70">{state.vibe}</p>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-saffron-400">
                <span>View all 5 cultural categories for {state.name}</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        ) : null}
      </div>

      {/* More 360° Scenes */}
      <section className="mx-auto mt-20 max-w-7xl px-5 sm:px-8" aria-labelledby="more-scenes">
        <div className="flex items-center justify-between">
          <h2 id="more-scenes" className="font-display text-2xl sm:text-3xl font-light text-parchment-100">
            Step into another 360° scene
          </h2>
          <Link to="/explore" className="text-xs font-semibold text-saffron-400 hover:text-saffron-300 transition-colors">
            View full atlas →
          </Link>
        </div>

        <div className="no-scrollbar -mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8">
          {more.map((p) => (
            <Link
              key={p.slug}
              to={`/panorama/${p.slug}`}
              className="group relative w-[250px] shrink-0 snap-start overflow-hidden rounded-[20px] border border-parchment-200/10 transition-all hover:border-saffron-400/50 hover:-translate-y-1"
            >
              <SafeImage
                src={panoramaPath(p.slug)}
                alt={p.name}
                loading="lazy"
                className="h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-ink-950/70 px-2 py-0.5 text-[10px] font-semibold text-saffron-300 backdrop-blur-md">
                  <Compass size={11} />
                  {p.kind === 'sphere' ? '360° Sphere' : 'Panoramic'}
                </span>
                <div className="mt-1 font-display text-base text-parchment-100 truncate">{p.name}</div>
                <div className="text-[11.5px] text-parchment-200/50 truncate">{p.place}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Historical Context Modal */}
      <AnimatePresence>
        {showReadMore && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReadMore(false)}
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
                  src={panoramaPath(place.slug)}
                  alt={place.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => setShowReadMore(false)}
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ink-950/70 text-parchment-100 backdrop-blur-md hover:bg-ink-950 transition-colors border border-white/10"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="rounded-full bg-saffron-400 px-3 py-1 text-xs font-bold text-ink-950">
                    {place.kind === 'sphere' ? '360° Equirectangular Scene' : 'Panoramic Wide Scene'}
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-light text-parchment-100">
                    {place.name}
                  </h3>
                  <p className="text-xs text-parchment-200/70">{place.place}</p>
                </div>
              </div>

              <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6 text-sm text-parchment-200/80">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-saffron-400 font-semibold">
                    Detailed Heritage Narrative
                  </h4>
                  <p className="mt-1.5 leading-relaxed text-parchment-100 text-sm">
                    {place.story}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-saffron-400 font-semibold">
                    Architectural & Cultural Highlights
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {place.facts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-parchment-200/85">
                        <span className="text-saffron-400 mt-0.5">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-white/[0.04] p-3.5 border border-white/5">
                  <h5 className="text-xs font-semibold text-parchment-100">Visitor Tip for this View</h5>
                  <p className="mt-1 text-xs text-parchment-200/70">
                    Drag the screen or use arrow keys to pan horizontally. Scroll or use the + and - buttons to zoom into intricate carvings and architectural details.
                  </p>
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setShowReadMore(false)}
                    className="rounded-full bg-parchment-100 hover:bg-white px-5 py-2 text-xs font-semibold text-ink-950 transition-colors"
                  >
                    Close
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
