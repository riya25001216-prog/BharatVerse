import { useNavigate } from 'react-router-dom';
import { Guide3D } from '../components/Guide3D';
import { SectionHeading } from '../components/Atmosphere';
import { AnimeTara } from '../components/AnimeTara';
import { LanguageSelector } from '../components/LanguageSelector';
import { useGuide } from '../lib/ask';
import { Sparkles, MessageCircle, Compass } from 'lucide-react';

export function GuidePage() {
  const navigate = useNavigate();
  const { ask } = useGuide();

  const prompts = [
    'Tell me about Rajasthan attire and crafts',
    'Best traditional food in South India',
    'Hidden gems of the North East',
    'Ancient temple architecture in Tamil Nadu',
    'Plan a 7-day cultural golden triangle trip',
  ];

  return (
    <section id="guide" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Virtual Guide"
          title="Meet Tara, your cultural companion in"
          highlight="three dimensions"
          description="Explore six curated multi-state routes in 3D, listen to spoken narration in 10 Indian languages, and ask Tara about any state, attire, food, craft, or monument."
        />

        {/* Dedicated Tara Guide Feature Banner */}
        <div className="mt-12 overflow-hidden rounded-[28px] border border-saffron-400/30 bg-gradient-to-br from-saffron-950/40 via-ink-900/90 to-ink-950 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative shrink-0 flex flex-col items-center">
              <AnimeTara size="lg" state="idle" showBadge />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-parchment-100 flex items-center justify-center md:justify-start gap-2">
                    Tara
                    <Sparkles size={18} className="text-saffron-400" />
                  </h3>
                  <p className="text-xs text-saffron-300 font-medium">
                    Multilingual Cultural AI Guide · 10 Indian Languages
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-parchment-200/60 hidden sm:inline">Selected Voice Language:</span>
                  <LanguageSelector />
                </div>
              </div>

              <p className="text-[14px] leading-relaxed text-parchment-200/75 max-w-2xl">
                Namaste! I guide you through 28 states and 8 union territories. Ask me anything about traditional attire, local cuisine, classical arts, regional festivals, or hidden gems.
              </p>

              <div className="pt-2">
                <span className="text-xs text-parchment-200/50 block mb-2 font-medium">
                  Popular questions for Tara:
                </span>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {prompts.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => ask(p)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-parchment-200/15 bg-white/[0.04] px-3.5 py-1.5 text-xs text-parchment-200/80 hover:border-saffron-400 hover:text-parchment-100 hover:bg-white/10 transition-all"
                    >
                      <MessageCircle size={12} className="text-saffron-400" />
                      <span>{p}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Journey Traverser */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-wider text-saffron-400 font-semibold flex items-center gap-2">
              <Compass size={14} />
              Interactive 3D Route Traveler
            </h3>
            <span className="text-xs text-parchment-200/50">
              Auto-advances through stops with waiting 360° scenes
            </span>
          </div>
          <Guide3D onOpenPanorama={(slug) => navigate(`/panorama/${slug}`)} />
        </div>
      </div>
    </section>
  );
}
