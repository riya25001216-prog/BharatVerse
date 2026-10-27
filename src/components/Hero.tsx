import { Link } from 'react-router-dom';
import { STATE_STORIES } from '../data/states';
import { PANORAMA_PLACES } from '../data/panoramas';

const FACTS = [
  { value: String(STATE_STORIES.length), label: 'states and union territories' },
  { value: String(PANORAMA_PLACES.length), label: 'scenes you can step inside' },
  { value: '1', label: 'voice guide you can simply talk to' },
];

export function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950">
      {/* photograph: Ganga aarti, Varanasi */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/scene-varanasi.jpg"
          alt="A priest raises a flaming lamp during the evening Ganga aarti in Varanasi"
          className="hero-zoom h-full w-full object-cover object-[70%_center]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0A0E1F_0%,rgba(10,14,31,0.86)_34%,rgba(10,14,31,0.25)_68%,rgba(10,14,31,0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-10 pt-28 sm:px-8 sm:pt-32">
        <div className="max-w-2xl">
          <p
            className="hero-anim hero-fade flex items-center gap-3 text-[15px] text-saffron-300"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="h-px w-10 bg-saffron-400" aria-hidden="true" />
            An atlas of India you can walk through
          </p>

          <h1 className="mt-6 font-display text-[clamp(3rem,8.5vw,6.75rem)] font-light leading-[0.92] tracking-[-0.035em] text-parchment-100">
            <span className="hero-anim hero-reveal block" style={{ animationDelay: '0.3s' }}>
              India,
            </span>
            <span
              className="hero-anim hero-reveal block font-playfair text-saffron-400"
              style={{ animationDelay: '0.45s' }}
            >
              one state
            </span>
            <span className="hero-anim hero-reveal block" style={{ animationDelay: '0.6s' }}>
              at a time.
            </span>
          </h1>

          <p
            className="hero-anim hero-fade mt-8 max-w-[34rem] text-[17px] leading-relaxed text-parchment-200/75"
            style={{ animationDelay: '0.8s' }}
          >
            Turn a 3D map of the whole country, open any state for its food, festivals and crafts,
            step inside real 360° scenes, and ask Tara, a voice guide, anything along the way.
          </p>

          <div className="hero-anim hero-fade mt-10 flex flex-wrap gap-3" style={{ animationDelay: '0.95s' }}>
            <Link to="/explore" className="btn-primary !px-7 !py-3.5 text-[15px]">
              Open the atlas
            </Link>
            <Link to="/destinations" className="btn-ghost !px-7 !py-3.5 text-[15px] backdrop-blur-sm">
              Browse destinations
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-anim hero-fade relative border-t border-parchment-200/10" style={{ animationDelay: '1.1s' }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <dl className="grid grid-cols-3 gap-6 sm:gap-12">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-3xl font-light text-parchment-100 sm:text-4xl">{f.value}</dd>
                <dd className="mt-1 max-w-[9rem] text-[12px] leading-snug text-parchment-200/55">{f.label}</dd>
              </div>
            ))}
          </dl>
          <p className="hidden max-w-[16rem] text-right text-[12px] leading-snug text-parchment-200/45 md:block">
            Evening Ganga aarti, Varanasi. Photo by An4shubam, CC BY-SA 4.0.
          </p>
        </div>
      </div>
    </section>
  );
}
