import { useEffect } from 'react';
import { Guide3D } from '../components/Guide3D';
import { SectionHeading } from '../components/Atmosphere';

export function GuidePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <section id="guide" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="The virtual guide"
          title="Travel the route in —"
          highlight="three dimensions"
          description="A live 3D atlas with the route drawn across it, a marker that moves as the story plays, and a 360° scene waiting at every stop."
        />
        <div className="mt-12">
          <Guide3D onOpenPanorama={(slug) => window.open(`/panorama/${slug}`, '_blank')} />
        </div>
      </div>
    </section>
  );
}
