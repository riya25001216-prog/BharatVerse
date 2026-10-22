import { useEffect, useRef, useState } from 'react';

const SPOTLIGHT_R = 260;

export function RevealLayer({
  image,
  active,
}: {
  image: string;
  active: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const raw = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });
  const smooth = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });
  const rafRef = useRef<number | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const canvas = canvasRef.current;
    const img = imgRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const onMove = (e: MouseEvent) => {
      raw.current.x = e.clientX;
      raw.current.y = e.clientY;
      setEntered(true);
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    };

    const loop = () => {
      const s = smooth.current;
      s.x += (raw.current.x - s.x) * 0.1;
      s.y += (raw.current.y - s.y) * 0.1;
      const x = s.x;
      const y = s.y;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      const c = canvas.getContext('2d');
      if (c) {
        c.clearRect(0, 0, w, h);
        const gradient = c.createRadialGradient(x, y, 0, x, y, SPOTLIGHT_R);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
        gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        c.fillStyle = gradient;
        c.beginPath();
        c.arc(x, y, SPOTLIGHT_R, 0, Math.PI * 2);
        c.fill();
        const dataUrl = (c as unknown as { toDataURL: (mime?: string) => string }).toDataURL('image/webp');
        const el = img;
        if (el) {
          el.style.webkitMaskImage = 'url("' + dataUrl + '")';
          el.style.maskImage = 'url("' + dataUrl + '")';
          el.style.webkitMaskSize = '100% 100%';
          el.style.maskSize = '100% 100%';
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [active, image]);

  const show = active && entered;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <img
        ref={imgRef}
        src={image}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: show ? 1 : 0,
          WebkitMaskImage: 'none',
          maskImage: 'none',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          pointerEvents: 'none',
        }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
