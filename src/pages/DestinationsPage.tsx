import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { SectionHeading } from '../components/Atmosphere';
import { SafeImage } from '../components/SafeImage';
import { imagePath } from '../lib/assets';
import { STATE_STORIES, REGIONS, REGION_COLORS } from '../data/states';

export function DestinationsPage() {
  const [region, setRegion] = useState('All');
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STATE_STORIES.filter(
      (s) =>
        (region === 'All' || s.region === region) &&
        (!q ||
          s.name.toLowerCase().includes(q) ||
          s.capital.toLowerCase().includes(q) ||
          s.landmarks.some((l) => l.name.toLowerCase().includes(q)))
    );
  }, [region, query]);

  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="left"
          kicker="Destinations"
          title="28 states, 8 union territories,"
          highlight="one page each"
          description="Pick a region or search for a capital or landmark. Every card opens that state's own story, photographs and 360° scenes."
        />

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 lg:mx-0 lg:px-0" role="tablist" aria-label="Filter by region">
            {REGIONS.map((r) => (
              <button
                key={r}
                role="tab"
                aria-selected={region === r}
                onClick={() => setRegion(r)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  region === r
                    ? 'border-saffron-400 bg-saffron-400 text-ink-950'
                    : 'border-parchment-200/15 text-parchment-200/70 hover:border-parchment-200/40 hover:text-parchment-100'
                }`}
              >
                {r === 'All' ? 'All regions' : r}
              </button>
            ))}
          </div>

          <label className="relative block w-full lg:w-80">
            <span className="sr-only">Search destinations</span>
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-parchment-200/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a state, capital or landmark"
              className="w-full rounded-full border border-parchment-200/15 bg-ink-800/60 py-2.5 pl-11 pr-4 text-sm text-parchment-100 placeholder-parchment-200/35 outline-none transition-colors focus:border-saffron-400/60"
            />
          </label>
        </div>

        <p className="mt-6 text-sm text-parchment-200/50" aria-live="polite">
          Showing {list.length} of {STATE_STORIES.length}
        </p>

        {list.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-parchment-200/20 p-12 text-center">
            <p className="font-display text-2xl text-parchment-100">Nothing matches “{query}”.</p>
            <p className="mt-2 text-sm text-parchment-200/55">Try a state name like Kerala, or clear the region filter.</p>
            <button
              onClick={() => {
                setQuery('');
                setRegion('All');
              }}
              className="btn-ghost mt-6"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <Link
                key={s.id}
                to={`/state/${s.id}`}
                className="group relative block overflow-hidden rounded-[22px] border border-parchment-200/10 bg-ink-800"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <SafeImage
                    src={imagePath(s.image)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-2 text-[12px] text-parchment-200/70">
                    <span className="h-2 w-2 rounded-full" style={{ background: REGION_COLORS[s.region] }} />
                    {s.region} {s.type === 'UT' ? 'union territory' : 'state'}
                  </div>
                  <h3 className="mt-1.5 font-display text-2xl font-normal text-parchment-100">{s.name}</h3>
                  <p className="mt-1 line-clamp-1 text-[13px] italic text-parchment-200/65">{s.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
