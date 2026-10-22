import { Link } from 'react-router-dom';
import { RevealLayer } from './RevealLayer';

const BASE_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';

const REVEAL_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100dvh' }}
    >
      {/* base image */}
      <div className="absolute inset-0 z-10">
        <img
          src={BASE_IMAGE}
          alt="India - a living heritage landscape"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_10%,rgba(4,5,12,0.12),rgba(4,5,12,0.88)_72%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/45 to-ink-950" />
      </div>

      {/* cursor spotlight reveal */}
      <RevealLayer image={REVEAL_IMAGE} active={true} />

      {/* heading */}
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-start">
        <h1 className="mt-[16vh] px-6 text-center sm:mt-[18vh]">
          <span
            className="hero-anim hero-reveal block font-playfair text-5xl font-normal leading-[0.95] text-white italic tracking-[-0.05em]"
            style={{ animationDelay: '0.25s' }}
          >
            Discover India&apos;s
          </span>
          <span
            className="hero-anim hero-reveal mt-3 block font-normal text-5xl leading-[0.95] text-white tracking-[-0.08em]"
            style={{ animationDelay: '0.42s' }}
          >
            Living Heritage
          </span>
        </h1>
      </div>

      {/* bottom left copy */}
      <div className="absolute bottom-14 left-10 z-50 hidden sm:block">
        <p
          className="hero-anim hero-fade max-w-[260px] text-sm leading-relaxed text-white/80"
          style={{ animationDelay: '0.7s' }}
        >
          Every state holds a world of its own {'\u2014'} woven through ancient monuments, living
          traditions, remarkable art, and stories passed across generations.
        </p>
      </div>

      {/* bottom right copy */}
      <div className="absolute bottom-10 left-5 right-5 z-50 sm:bottom-24 sm:left-auto sm:right-10 md:right-14">
        <div className="flex flex-col items-start gap-4 sm:gap-5">
          <p
            className="hero-anim hero-fade max-w-full text-sm leading-relaxed text-white/80 sm:max-w-[260px]"
            style={{ animationDelay: '0.85s' }}
          >
            Explore the places, people, and traditions that make India extraordinary. Let every
            discovery inspire your next journey.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-10 left-1/2 z-50 -translate-x-1/2 sm:bottom-12">
        <Link
          to="/explore"
          className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
        >
          Explore India
        </Link>
      </div>
    </section>
  );
}
