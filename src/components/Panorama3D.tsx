import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export interface PanoramaHotspot {
  lat: number;
  lng: number;
  label: string;
  note: string;
}

export interface Panorama3DProps {
  url: string;
  kind: 'sphere' | 'cylinder';
  lat: number;
  lng: number;
  title: string;
  hotspots?: PanoramaHotspot[];
  onHotspot?: (spot: PanoramaHotspot | null) => void;
  className?: string;
}

const R_SPHERE = 50;
const R_CYL = 26;

function toSphere(lat: number, lng: number, radius = R_SPHERE): [number, number, number] {
  const phi = ((lng + 180) * Math.PI) / 180;
  const theta = ((90 - lat) * Math.PI) / 180;
  return [
    -radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function toCylinder(lat: number, lng: number, radius = R_CYL): [number, number, number] {
  const u = (lng + 180) / 360;
  const theta = u * Math.PI * 2;
  const h = ((lat - 20) / 60) * 16;
  return [radius * Math.sin(theta), h, radius * Math.cos(theta)];
}

function Rig({
  yaw,
  pitch,
  autoRotate,
  onHeading,
}: {
  yaw: number;
  pitch: number;
  autoRotate: boolean;
  onHeading: (deg: number) => void;
}) {
  const { camera } = useThree();
  const yawRef = useRef(yaw);
  const pitchRef = useRef(pitch);

  useEffect(() => {
    yawRef.current = yaw;
    pitchRef.current = pitch;
  }, [yaw, pitch]);

  useFrame((_, delta) => {
    if (autoRotate) yawRef.current += delta * 0.06;
    camera.rotation.order = 'YXZ';
    camera.rotation.y = yawRef.current;
    camera.rotation.x = pitchRef.current;
    const deg = ((-yawRef.current * 180) / Math.PI + 360) % 360;
    onHeading(deg);
  });

  return null;
}

function SpherePanorama({
  url,
  hotspots = [],
  onHotspot,
}: {
  url: string;
  hotspots: PanoramaHotspot[];
  onHotspot?: (s: PanoramaHotspot | null) => void;
}) {
  const texture = useTexture(url);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  const mark = (index: number, spot: PanoramaHotspot) => {
    setActive(index);
    onHotspot?.(spot);
  };

  return (
    <group>
      <mesh>
        <sphereGeometry args={[R_SPHERE, 72, 48]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      {hotspots.map((h, i) => {
        const p = toSphere(h.lat, h.lng);
        return (
          <mesh
            key={`${h.label}-${i}`}
            position={p}
            onClick={(e) => {
              e.stopPropagation();
              mark(i, h);
            }}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'auto')}
          >
            <sphereGeometry args={[0.9, 18, 18]} />
            <meshBasicMaterial color={active === i ? '#ffc46b' : '#ffffff'} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

function CylinderPanorama({
  url,
  hotspots = [],
  onHotspot,
}: {
  url: string;
  hotspots: PanoramaHotspot[];
  onHotspot?: (s: PanoramaHotspot | null) => void;
}) {
  const texture = useTexture(url);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <group>
      <mesh>
        <cylinderGeometry args={[R_CYL, R_CYL, 18, 72, 1, true]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      {/* floor + ceiling to close the cylinder */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -9, 0]}>
        <circleGeometry args={[R_CYL, 64]} />
        <meshBasicMaterial color="#0a0e1c" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 9, 0]}>
        <circleGeometry args={[R_CYL, 64]} />
        <meshBasicMaterial color="#0a0e1c" side={THREE.DoubleSide} />
      </mesh>
      {hotspots.map((h, i) => {
        const p = toCylinder(h.lat, h.lng);
        return (
          <mesh
            key={`${h.label}-${i}`}
            position={p}
            onClick={(e) => {
              e.stopPropagation();
              setActive(i);
              onHotspot?.(h);
            }}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'auto')}
          >
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshBasicMaterial color={active === i ? '#ffc46b' : '#ffffff'} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

export function Panorama3D({
  url,
  kind,
  lat,
  lng,
  title,
  hotspots = [],
  onHotspot,
  className = '',
}: Panorama3DProps) {
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [fov, setFov] = useState(72);
  const [autoRotate, setAutoRotate] = useState(false);
  const [heading, setHeading] = useState(0);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    drag.current = { x: e.clientX, y: e.clientY };
    setYaw((y) => y - dx * 0.12);
    setPitch((p) => Math.max(-0.85, Math.min(0.85, p - dy * 0.1)));
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setFov((f) => Math.max(32, Math.min(100, f + Math.sign(e.deltaY) * 4)));
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const handler = (e: Event) => e.preventDefault();
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  const compass = useMemo(() => {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(heading / 45) % 8];
  }, [heading]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
    >
      <Canvas dpr={[1, 1.6]} camera={{ fov, near: 0.1, far: 200 }} gl={{ antialias: true }}>
        <color attach="background" args={['#05070f']} />
        <Suspense fallback={null}>
          {kind === 'sphere' ? (
            <SpherePanorama url={url} hotspots={hotspots} onHotspot={onHotspot} />
          ) : (
            <CylinderPanorama url={url} hotspots={hotspots} onHotspot={onHotspot} />
          )}
        </Suspense>
        <Rig yaw={yaw} pitch={pitch} autoRotate={autoRotate} onHeading={setHeading} />
      </Canvas>

      {/* live heading readout */}
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1.5 backdrop-blur-md">
        <span className="relative grid h-4 w-4 place-items-center">
          <span
            className="absolute inset-0 rounded-full border border-white/25"
            style={{ transform: `rotate(${heading}deg)` }}
          >
            <span className="absolute left-1/2 top-0 h-1 w-px -translate-x-1/2 bg-saffron-300" />
          </span>
        </span>
        <span className="text-[11px] font-medium tabular-nums text-white/80">
          {compass} · {Math.round(heading)}°
        </span>
        <span className="text-[10px] tabular-nums text-white/40">
          {lat.toFixed(3)}°, {lng.toFixed(3)}°
        </span>
      </div>

      <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1.5 text-[11px] text-white/70 backdrop-blur-md">
        {title}
      </div>

      {/* controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setFov((f) => Math.max(32, f - 8))}
          className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-ink-950/60 text-white/80 backdrop-blur-md transition-colors hover:text-white"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => setFov((f) => Math.min(100, f + 8))}
          className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-ink-950/60 text-white/80 backdrop-blur-md transition-colors hover:text-white"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          onClick={() => setAutoRotate((a) => !a)}
          className={`grid h-9 w-9 place-items-center rounded-xl border backdrop-blur-md transition-colors ${
            autoRotate ? 'border-saffron-300/60 text-saffron-300' : 'border-white/15 text-white/80'
          }`}
          aria-label="Toggle auto rotate"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 12a9 9 0 1 1-3-6.7" strokeLinecap="round" />
            <path d="M21 4v5h-5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/50 backdrop-blur-md">
        Drag to look around · scroll to zoom
      </div>
    </div>
  );
}
