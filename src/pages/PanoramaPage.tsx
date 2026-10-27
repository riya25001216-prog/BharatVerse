import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye, MessageCircle } from 'lucide-react';
import { Panorama3D } from '../components/Panorama3D';
import { PANORAMA_BY_SLUG, PANORAMA_PLACES } from '../data/panoramas';
import { STATE_BY_ID } from '../data/states';
import { useGuide } from '../lib/ask';
import { setLiveView } from '../lib/liveView';

export function PanoramaPage() {
  const { slug = '' } = useParams();
  const place = PANORAMA_BY_SLUG[slug];
  const { ask, explainView } = useGuide();
  const captureRef = useRef<(() => Promise<Blob | null>) | null>(null);
  const [facing, setFacing] = useState('N');
  const onFacing = useCallback((c: string) => setFacing(c), []);

  // Tell the voice guide exactly what is on screen, including which way the visitor faces.
  useEffect(() => {
    if (!place) return;
    const words: Record<string, string> = {
      N: 'north', NE: 'north-east', E: 'east', SE: 'south-east', S: 'south', SW: 'south-west', W: 'west', NW: 'north-west',
    };
    const view = place.kind === 'sphere' ? `the 360-degree view of ${place.name}, facing ${words[facing]}` : `a wide view of ${place.name}`;
    setLiveView({
      description: `The visitor is standing inside ${view}, in ${place.place}. ${place.caption} ${place.story} Key facts: ${place.facts.join('; ')}.`,
      capture: () => captureRef.current?.() ?? Promise.resolve(null),
    });
  }, [place, facing]);

  const more = useMemo(() => {
    if (!place) return [];
    const sameState = PANORAMA_PLACES.filter((p) => p.slug !== place.slug && p.stateId === place.stateId);
    const rest = PANORAMA_PLACES.filter((p) => p.slug !== place.slug && p.stateId !== place.stateId);
    // Prefer true 360° scenes, then everything else.
    rest.sort((a, b) => Number(b.kind === 'sphere') - Number(a.kind === 'sphere'));
    return [...sameState, ...rest].slice(0, 8);
  }, [place]);

  if (!place) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-start justify-center px-6 pt-24">
        <h1 className="font-display text-4xl font-light text-parchment-100">There’s no scene here yet.</h1>
        <p className="mt-3 text-parchment-200/60">Pick another place from the list of scenes.</p>
        <Link to="/explore" className="btn-primary mt-8">
          Back to the atlas
        </Link>
      </div>
    );
  }

  const state = STATE_BY_ID[place.stateId];

  return (
    <article className="pb-20">
      <div className="relative h-[100svh] min-h-[520px]">
        <Panorama3D
          className="absolute inset-0"
          url={`/panoramas/${place.slug}.jpg`}
          kind={place.kind}
          title={place.name}
          captureRef={captureRef}
          onFacingChange={onFacing}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink-950/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-10">
          <p className="text-[14px] text-saffron-300">{place.place}</p>
          <h1 className="mt-1 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.03em] text-parchment-100">
            {place.name}
          </h1>
          <p className="mt-3 max-w-xl text-[16px] italic text-parchment-200/75">{place.caption}</p>
          <button
            type="button"
            onClick={explainView}
            className="btn-primary pointer-events-auto mt-6 !px-6 !py-3 shadow-[0_12px_40px_-10px_rgba(242,169,59,0.8)]"
          >
            <Eye size={18} />
            Ask Tara to explain this view
          </button>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div>
          <p className="max-w-2xl font-display text-2xl font-light leading-snug text-parchment-100 sm:text-[1.75rem]">
            {place.story}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {place.facts.map((f) => (
              <li key={f} className="border-l-2 border-saffron-400/70 pl-4 text-[15px] leading-snug text-parchment-200/80">
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => ask(`Tell me about ${place.name} in ${place.place}`)}
            className="btn-ghost mt-10"
          >
            <MessageCircle size={16} />
            Ask Tara about this place
          </button>
        </div>

        {state ? (
          <Link
            to={`/state/${state.id}`}
            className="group block overflow-hidden rounded-[22px] border border-parchment-200/10 bg-ink-800 transition-colors hover:border-saffron-400/45"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={`/images/${state.image}.jpg`}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-[13px] text-saffron-300">More from</div>
                <div className="font-display text-2xl text-parchment-100">{state.name}</div>
              </div>
            </div>
            <p className="p-5 text-[14px] leading-relaxed text-parchment-200/65">{state.vibe}</p>
          </Link>
        ) : null}
      </div>

      <section className="mx-auto mt-20 max-w-7xl px-5 sm:px-8" aria-labelledby="more-scenes">
        <h2 id="more-scenes" className="font-display text-3xl font-light text-parchment-100">
          Step into another scene
        </h2>
        <div className="no-scrollbar -mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
          {more.map((p) => (
            <Link
              key={p.slug}
              to={`/panorama/${p.slug}`}
              className="group relative w-[240px] shrink-0 snap-start overflow-hidden rounded-[20px] border border-parchment-200/10 transition-colors hover:border-saffron-400/50"
            >
              <img
                src={`/panoramas/${p.slug}.jpg`}
                alt=""
                loading="lazy"
                className="h-40 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="text-[12px] text-saffron-300">{p.kind === 'sphere' ? '360° view' : 'Wide view'}</div>
                <div className="font-display text-lg text-parchment-100">{p.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
