import { useEffect } from 'react';

export function RidgeHeroPage() {
  useEffect(() => {
    // Lock body overflow while viewing the full-viewport hero
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] h-screen w-screen overflow-hidden bg-[#0d1527]">
      <iframe
        src={`${import.meta.env.BASE_URL}ridge-ai.html`}
        title="RidgeAI Hero"
        className="h-full w-full border-none"
      />
    </div>
  );
}
