import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Eye, Search } from 'lucide-react';
import { SectionHeading } from '../components/Atmosphere';
import { SafeImage } from '../components/SafeImage';
import { PANORAMA_PLACES, type PanoramaPlace } from '../data/panoramas';
import { STATE_BY_ID, REGION_COLORS } from '../data/states';
import { panoramaPath } from '../lib/assets';
import { useLanguage } from '../lib/i18n';

const TYPE_FILTERS = [
  { id: 'all', label: 'All Monuments (38)' },
  { id: 'sphere', label: '360° Virtual Spheres (13)' },
  { id: 'photo', label: 'Wide Panoramic Views (25)' },
];

export function PanoramasPage() {
  const { t } = useLanguage();
  const [typeFilter, setTypeFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PANORAMA_PLACES.filter((p) => {
      const state = STATE_BY_ID[p.stateId];
      const matchType =
        typeFilter === 'all' ||
        (typeFilter === 'sphere' && p.kind === 'sphere') ||
        (typeFilter === 'photo' && p.kind === 'photo');

      const matchRegion =
        regionFilter === 'all' || (state && state.region.toLowerCase() === regionFilter.toLowerCase());

      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.place.toLowerCase().includes(q) ||
        (state && state.name.toLowerCase().includes(q)) ||
        p.caption.toLowerCase().includes(q);

      return matchType && matchRegion && matchSearch;
    });
  }, [typeFilter, regionFilter, searchQuery]);

  return (
    <div className="pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Page Header */}
        <SectionHeading
          kicker={t('panoramas')}
          title="Step Inside India’s Great"
          highlight="360° Monuments"
          description="Stand in the middle of 38 iconic architectural marvels, coastal fortresses, high-altitude monasteries, and holy ghats. Drag to look in full 360 degrees or zoom in on ancient stone carvings."
        />

        {/* Search and Filters */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-parchment-200/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search monuments, cities, or states..."
              className="w-full rounded-full border border-parchment-200/15 bg-ink-950/60 py-3 pl-11 pr-4 text-sm text-parchment-100 placeholder-parchment-200/40 backdrop-blur-md outline-none focus:border-saffron-400/60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setTypeFilter(f.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  typeFilter === f.id
                    ? 'bg-saffron-400 text-ink-950 shadow-md'
                    : 'border border-parchment-200/15 bg-white/5 text-parchment-200/70 hover:bg-white/10 hover:text-parchment-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Monuments Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlaces.map((place: PanoramaPlace) => {
            const state = STATE_BY_ID[place.stateId];
            const isSphere = place.kind === 'sphere';
            return (
              <article
                key={place.slug}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-parchment-200/15 bg-ink-950/60 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-saffron-400/40 hover:shadow-[0_12px_35px_rgba(242,169,59,0.15)]"
              >
                {/* Thumbnail Stage */}
                <div className="relative h-56 w-full overflow-hidden bg-ink-900">
                  <SafeImage
                    src={panoramaPath(place.slug)}
                    alt={place.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-black/30" />

                  {/* Mode Badge */}
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-ink-950/70 px-3 py-1 text-[11px] font-medium text-parchment-100 backdrop-blur-md">
                    <Compass size={13} className={isSphere ? 'text-saffron-400 animate-spin' : 'text-parchment-200/60'} style={{ animationDuration: '6s' }} />
                    <span>{isSphere ? '360° Sphere' : 'Wide Panorama'}</span>
                  </div>

                  {/* Location Pin */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-parchment-200/80">
                    <span className="truncate">{place.place}</span>
                    {state && (
                      <span
                        className="rounded px-2 py-0.5 text-[10px] font-semibold text-ink-950"
                        style={{ background: REGION_COLORS[state.region] || '#F2A93B' }}
                      >
                        {state.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-display text-xl font-light text-parchment-100 group-hover:text-saffron-300 transition-colors">
                      {place.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-parchment-200/70">
                      {place.caption}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-[11px] text-parchment-200/50">
                      {place.facts[0] || 'Architectural Treasure'}
                    </span>
                    <Link
                      to={`/panorama/${place.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-saffron-400 hover:bg-saffron-300 px-4 py-2 text-xs font-semibold text-ink-950 transition-colors shadow-md"
                    >
                      <Eye size={13} />
                      <span>Explore in 360° ↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredPlaces.length === 0 && (
          <div className="my-16 flex flex-col items-center justify-center text-center">
            <Compass size={36} className="text-saffron-400/50 mb-3" />
            <h3 className="font-display text-lg text-parchment-100">No matching monuments found</h3>
            <p className="mt-1 text-sm text-parchment-200/60">Try searching for a different state, monument name, or clear your filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setRegionFilter('all');
              }}
              className="btn-primary mt-4 !px-5 !py-2 text-xs"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
