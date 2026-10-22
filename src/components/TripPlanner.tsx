import { useMemo, useState } from 'react';
import { JOURNEYS, JOURNEY_BY_ID } from '../data/journeys';
import { motion } from 'framer-motion';

const OFFICIAL_TAJ = 'https://www.tajmahal.gov.in/';
const OFFICIAL_RAJASTHAN = 'https://www.tourism.rajasthan.gov.in/';
const OFFICIAL_GENERIC = 'https://www.tourism.gov.in/';

const BOOKING_LINKS: { match: RegExp; url: string }[] = [
  { match: /taj/i, url: OFFICIAL_TAJ },
  { match: /rajasthan|jaipur|amber|hawa|mehrangarh|jaisalmer|rani/i, url: OFFICIAL_RAJASTHAN },
  { match: /kerala|goa|india/i, url: OFFICIAL_GENERIC },
];

const bookingUrl = (text: string) => {
  for (const b of BOOKING_LINKS) {
    if (b.match.test(text)) return b.url;
  }
  return OFFICIAL_GENERIC;
};

const INTERESTS = ['Temples', 'Wildlife', 'Food', 'Beaches', 'Mountains', 'Festivals', 'Heritage'];

export function TripPlanner() {
  const [destinationId, setDestinationId] = useState(JOURNEYS[0]?.id ?? '');
  const [days, setDays] = useState(5);
  const [startDate, setStartDate] = useState('');
  const [travellers, setTravellers] = useState(2);
  const [interests, setInterests] = useState<string[]>(['Temples', 'Food']);
  const [tripId, setTripId] = useState<string | null>(null);

  const trip = tripId ? JOURNEY_BY_ID[tripId] ?? null : null;

  const toggleInterest = (i: string) =>
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const generate = () => {
    setTripId(destinationId || JOURNEYS[0]?.id || null);
  };

  const itinerary = useMemo(() => trip?.plan.slice(0, Math.max(1, days)) ?? [], [trip, days]);

  return (
    <section id="plan" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.34em] text-saffron-300/90">
            Section five
          </div>
          <h2 className="mt-5 font-display text-4xl font-light leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
            Plan your <span className="font-playfair text-shine italic">own journey</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/55">
            Choose a curated route, set your dates, budget and travellers, and BharatVerse will assemble
            a day-by-day itinerary from the same stops the virtual guide narrates.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="glass mt-12 rounded-[30px] p-5 sm:p-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Destination</span>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-saffron-300/45"
              >
                {JOURNEYS.map((j) => (
                  <option key={j.id} value={j.id} className="bg-ink-900 text-white">
                    {j.name} — {j.subtitle}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Days</span>
              <input
                type="number"
                min={1}
                max={21}
                value={days}
                onChange={(e) => setDays(Math.max(1, Math.min(21, Number(e.target.value) || 1)))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-saffron-300/45"
              />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Start date</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-saffron-300/45"
              />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Travellers</span>
              <input
                type="number"
                min={1}
                max={16}
                value={travellers}
                onChange={(e) => setTravellers(Math.max(1, Math.min(16, Number(e.target.value) || 1)))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-saffron-300/45"
              />
            </label>
          </div>

          <div className="mt-5">
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Interests</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleInterest(i)}
                  className={`chip shrink-0 border transition-all ${
                    interests.includes(i)
                      ? 'border-transparent bg-saffron-300 text-ink-950'
                      : 'border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={generate}
              className="sheen rounded-full bg-[linear-gradient(90deg,#ffc46b,#f98a09)] px-7 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.02]"
            >
              Generate itinerary
            </button>
            <span className="text-[12px] text-white/40">Budget guidance: ask Tara in the guide.</span>
          </div>
        </motion.div>

        {trip ? (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mt-8 rounded-[30px] p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-saffron-300/80">
                  {trip.subtitle}
                </div>
                <h3 className="mt-1 font-display text-2xl font-light text-white">{trip.name}</h3>
              </div>
              <div className="text-[12px] text-white/50">
                {trip.duration} · {trip.distance} · {trip.budget}
              </div>
            </div>

            <ol className="mt-8 space-y-5 border-l border-white/10 pl-6">
              {itinerary.map((p) => (
                <li key={p.day} className="relative">
                  <span className="absolute -left-[30px] top-1.5 h-2 w-2 rounded-full bg-saffron-300/80 ring-4 ring-ink-950" />
                  <div className="text-[10px] uppercase tracking-[0.18em] text-saffron-300/70">{p.day}</div>
                  <div className="mt-0.5 text-[14px] font-medium text-white">{p.title}</div>
                  <div className="mt-0.5 text-[13px] leading-relaxed text-white/50">{p.detail}</div>
                  <div className="mt-2">
                    <a
                      href={bookingUrl(p.title + ' ' + p.detail)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[12px] font-medium text-white/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-saffron-300"
                    >
                      Check official booking / tickets
                    </a>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-[12px] leading-relaxed text-white/40">
              BharatVerse prepares the route; bookings happen on official tourism or monument websites.
              Nothing here is confirmed until you complete a booking there.
            </p>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
