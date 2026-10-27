import { Component, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Maximize2, Minimize2, Minus, Plus, RotateCw, Compass, Image as ImageIcon, Globe } from 'lucide-react';
import type { PanoramaKind } from '../lib/geo';

export interface Panorama3DProps {
  url: string;
  kind: PanoramaKind;
  title: string;
  className?: string;
  /** Called when the compass direction (N, NE, …) the visitor faces changes. */
  onFacingChange?: (compass: string) => void;
  /** Receives a function that snapshots the current frame as a JPEG. */
  captureRef?: React.MutableRefObject<(() => Promise<Blob | null>) | null>;
}

const SPHERE_R = 50;
const WALL_R = 20;
const WALL_H = 22;
const FOV_DEFAULT = 70;
const FOV_MIN = 30;
const FOV_MAX = 90;
const DEG = Math.PI / 180;

interface View {
  yaw: number;
  pitch: number;
  fov: number;
  vYaw: number;
  vPitch: number;
  autoRotate: boolean;
  panDir: 1 | -1;
  dragging: boolean;
  arcHalf: number | null;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function Rig({ view, onHeading }: { view: React.MutableRefObject<View>; onHeading: (deg: number) => void }) {
  const { camera, size } = useThree();
  const lastHeading = useRef(-1);

  useFrame((_, delta) => {
    const v = view.current;
    const cam = camera as THREE.PerspectiveCamera;
    const dt = Math.min(delta, 0.05);

    if (!v.dragging) {
      v.yaw += v.vYaw * dt;
      v.pitch += v.vPitch * dt;
      const damp = Math.exp(-dt * 5);
      v.vYaw *= damp;
      v.vPitch *= damp;
      if (v.autoRotate) v.yaw += dt * 0.07 * v.panDir;
    }

    const vHalf = (v.fov * DEG) / 2;
    if (v.arcHalf != null) {
      const hHalf = Math.atan(Math.tan(vHalf) * (size.width / Math.max(1, size.height)));
      const yawLimit = Math.max(0, v.arcHalf - hHalf);
      if (v.yaw >= yawLimit) v.panDir = -1;
      if (v.yaw <= -yawLimit) v.panDir = 1;
      v.yaw = clamp(v.yaw, -yawLimit, yawLimit);
      const pitchLimit = Math.max(0, Math.atan(WALL_H / 2 / WALL_R) - vHalf);
      v.pitch = clamp(v.pitch, -pitchLimit, pitchLimit);
    } else {
      v.pitch = clamp(v.pitch, -1.35, 1.35);
    }

    if (Math.abs(cam.fov - v.fov) > 0.01) {
      cam.fov += (v.fov - cam.fov) * Math.min(1, dt * 10);
      cam.updateProjectionMatrix();
    }
    cam.rotation.order = 'YXZ';
    cam.rotation.y = v.yaw;
    cam.rotation.x = v.pitch;

    const deg = Math.round(((((-v.yaw * 180) / Math.PI) % 360) + 360) % 360);
    if (deg !== lastHeading.current) {
      lastHeading.current = deg;
      onHeading(deg);
    }
  });

  return null;
}

function useSceneTexture(url: string) {
  const texture = useTexture(url);
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);
  return texture;
}

function SphereScene({ url, onLoaded }: { url: string; onLoaded?: () => void }) {
  const texture = useSceneTexture(url);
  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[SPHERE_R, 96, 64]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function PhotoWall({ url, onArc, onLoaded }: { url: string; onArc: (half: number) => void; onLoaded?: () => void }) {
  const texture = useSceneTexture(url);
  const img = texture.image as { width?: number; height?: number } | undefined;
  const width = img?.width || 2048;
  const height = img?.height || 1024;
  const aspect = width / height;
  const theta = Math.min(Math.PI * 1.6, (aspect * WALL_H) / WALL_R);

  useEffect(() => {
    onArc(theta / 2);
    onLoaded?.();
  }, [theta, onArc, onLoaded]);

  return (
    <mesh scale={[-1, 1, 1]}>
      <cylinderGeometry args={[WALL_R, WALL_R, WALL_H, 96, 1, true, Math.PI - theta / 2, theta]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

class SceneBoundary extends Component<
  { children: ReactNode; resetKey: string; fallbackComponent: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidUpdate(prev: { resetKey: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false });
    }
  }
  render() {
    if (this.state.failed) {
      return this.props.fallbackComponent;
    }
    return this.props.children;
  }
}

const ctrl =
  'grid h-10 w-10 place-items-center rounded-full border border-parchment-200/20 bg-ink-950/75 text-parchment-100 backdrop-blur-md transition-colors hover:border-saffron-400/60 hover:text-saffron-300 shadow-lg';

export function Panorama3D({
  url,
  kind,
  title,
  className = '',
  onFacingChange,
  captureRef,
}: Panorama3DProps) {
  const isSphere = kind === 'sphere';
  const [use3D, setUse3D] = useState(true);
  const [loaded3D, setLoaded3D] = useState(false);
  const [photoZoom, setPhotoZoom] = useState(1);
  const [photoPan, setPhotoPan] = useState({ x: 0, y: 0 });
  const [isPhotoPanning, setIsPhotoPanning] = useState(false);
  const photoStart = useRef({ x: 0, y: 0, startPanX: 0, startPanY: 0 });

  const view = useRef<View>({
    yaw: 0,
    pitch: 0,
    fov: FOV_DEFAULT,
    vYaw: 0,
    vPitch: 0,
    autoRotate: false,
    panDir: 1,
    dragging: false,
    arcHalf: isSphere ? null : 0.9,
  });

  const [heading, setHeading] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [hinted, setHinted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    setLoaded3D(false);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    Object.assign(view.current, {
      yaw: 0,
      pitch: 0,
      fov: FOV_DEFAULT,
      vYaw: 0,
      vPitch: 0,
      panDir: 1,
      arcHalf: isSphere ? null : 0.9,
    });
    setAutoRotate(!reduce);
    setHinted(false);
  }, [url, isSphere]);

  useEffect(() => {
    view.current.autoRotate = autoRotate;
  }, [autoRotate]);

  const zoom = useCallback((delta: number) => {
    if (use3D) {
      view.current.fov = clamp(view.current.fov + delta, FOV_MIN, FOV_MAX);
    } else {
      setPhotoZoom((z) => clamp(z - delta * 0.05, 1, 3.5));
    }
  }, [use3D]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoom(Math.sign(e.deltaY) * 4);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoom]);

  useEffect(() => {
    const onFs = () => setFullscreen(document.fullscreenElement === wrapRef.current);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void wrapRef.current?.requestFullscreen?.();
  };

  const radPerPx = () => (view.current.fov * DEG) / (wrapRef.current?.clientHeight || 600);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.currentTarget.setPointerCapture(e.pointerId);

    if (use3D) {
      drag.current = { x: e.clientX, y: e.clientY, t: performance.now() };
      Object.assign(view.current, { dragging: true, vYaw: 0, vPitch: 0 });
      setAutoRotate(false);
    } else {
      setIsPhotoPanning(true);
      photoStart.current = {
        x: e.clientX,
        y: e.clientY,
        startPanX: photoPan.x,
        startPanY: photoPan.y,
      };
    }
    setHinted(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (use3D) {
      if (!drag.current) return;
      const now = performance.now();
      const k = radPerPx();
      const dYaw = (e.clientX - drag.current.x) * k;
      const dPitch = (e.clientY - drag.current.y) * k;
      const dt = Math.max(0.001, (now - drag.current.t) / 1000);
      view.current.yaw += dYaw;
      view.current.pitch = clamp(view.current.pitch + dPitch, -1.35, 1.35);
      view.current.vYaw = dYaw / dt;
      view.current.vPitch = dPitch / dt;
      drag.current = { x: e.clientX, y: e.clientY, t: now };
    } else if (isPhotoPanning) {
      const dx = e.clientX - photoStart.current.x;
      const dy = e.clientY - photoStart.current.y;
      setPhotoPan({
        x: photoStart.current.startPanX + dx,
        y: photoStart.current.startPanY + dy,
      });
    }
  };

  const endDrag = () => {
    drag.current = null;
    view.current.dragging = false;
    setIsPhotoPanning(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const v = view.current;
    const step = 0.12;
    if (e.key === 'ArrowLeft') v.yaw += step;
    else if (e.key === 'ArrowRight') v.yaw -= step;
    else if (e.key === 'ArrowUp') v.pitch += step;
    else if (e.key === 'ArrowDown') v.pitch -= step;
    else if (e.key === '+' || e.key === '=') zoom(-6);
    else if (e.key === '-') zoom(6);
    else return;
    e.preventDefault();
    setAutoRotate(false);
    setHinted(true);
  };

  const onArc = useCallback((half: number) => {
    view.current.arcHalf = half;
  }, []);

  const compass = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(heading / 45) % 8];

  useEffect(() => {
    onFacingChange?.(compass);
  }, [compass, onFacingChange]);

  // High-Resolution 2D Pan-and-Zoom Fallback Component
  const PhotoFallback = (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-ink-950">
      <img
        src={url}
        alt={title}
        draggable={false}
        style={{
          transform: `translate(${photoPan.x}px, ${photoPan.y}px) scale(${photoZoom})`,
          transition: isPhotoPanning ? 'none' : 'transform 0.2s ease-out',
          cursor: isPhotoPanning ? 'grabbing' : 'grab',
        }}
        className="max-h-full max-w-none select-none object-cover"
      />
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/20 bg-ink-950/70 px-3.5 py-1.5 text-xs text-parchment-100 backdrop-blur-md">
        High-Resolution Panorama Mode · Drag to pan, scroll to zoom ({Math.round(photoZoom * 100)}%)
      </div>
    </div>
  );

  return (
    <div
      ref={wrapRef}
      className={`relative h-full w-full cursor-grab touch-none select-none overflow-hidden bg-ink-950 outline-none active:cursor-grabbing ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="application"
      aria-label={`${title}. ${isSphere ? '360 degree view' : 'Wide view'}`}
    >
      {/* Background preview image: guarantees instant picture while WebGL texture initializes */}
      <img
        src={url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover filter blur-[2px] opacity-40 scale-105"
      />

      {use3D ? (
        <SceneBoundary resetKey={url} fallbackComponent={PhotoFallback}>
          <div className="absolute inset-0">
            <Canvas
              dpr={[1, 1.75]}
              camera={{ fov: FOV_DEFAULT, near: 0.1, far: 200, position: [0, 0, 0.01] }}
              gl={{ antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}
              onCreated={({ gl }) => {
                if (captureRef) {
                  captureRef.current = () =>
                    new Promise((resolve) => gl.domElement.toBlob((b) => resolve(b), 'image/jpeg', 0.85));
                }
              }}
            >
              <color attach="background" args={['#0A0E1F']} />
              <Suspense fallback={null}>
                {isSphere ? (
                  <SphereScene key={url} url={url} onLoaded={() => setLoaded3D(true)} />
                ) : (
                  <PhotoWall key={url} url={url} onArc={onArc} onLoaded={() => setLoaded3D(true)} />
                )}
              </Suspense>
              <Rig view={view} onHeading={setHeading} />
            </Canvas>
          </div>

          {/* Loading HUD: shows spinning golden compass until 3D texture is ready */}
          {!loaded3D && (
            <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-ink-950/75 backdrop-blur-sm">
              <div className="relative mb-3 grid h-12 w-12 place-items-center rounded-full bg-saffron-400/20 text-saffron-400 border border-saffron-400/40">
                <Compass size={24} className="animate-spin text-saffron-300" style={{ animationDuration: '3s' }} />
              </div>
              <p className="font-display text-base font-light text-parchment-100">
                Entering 360° {title}…
              </p>
              <p className="mt-1 text-xs text-parchment-200/60">
                Initializing immersive 3D panoramic projection
              </p>
            </div>
          )}
        </SceneBoundary>
      ) : (
        PhotoFallback
      )}

      {/* Compass / Mode Pill */}
      {isSphere && use3D ? (
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2.5 rounded-full border border-parchment-200/15 bg-ink-950/75 px-3.5 py-2 backdrop-blur-md shadow-lg">
          <span className="relative h-5 w-5 rounded-full border border-parchment-200/30" aria-hidden="true">
            <span className="absolute inset-0" style={{ transform: `rotate(${-heading}deg)` }}>
              <span className="absolute left-1/2 top-[2px] h-2 w-[2px] -translate-x-1/2 rounded-full bg-saffron-400" />
            </span>
          </span>
          <span className="text-xs font-semibold tabular-nums text-parchment-100">
            360° view · Facing {compass}
          </span>
        </div>
      ) : (
        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-parchment-200/15 bg-ink-950/75 px-3.5 py-2 text-xs font-semibold text-parchment-100 backdrop-blur-md shadow-lg">
          {use3D ? 'Wide Cylindrical View' : 'High-Res Photo View'}
        </div>
      )}

      {/* View Mode Toggle: 3D Sphere vs High-Res Photo */}
      <div className="absolute left-4 bottom-5 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setUse3D((v) => !v);
            setPhotoZoom(1);
            setPhotoPan({ x: 0, y: 0 });
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-saffron-400/40 bg-ink-950/80 px-3.5 py-1.5 text-xs font-medium text-saffron-300 backdrop-blur-md hover:bg-saffron-400/20 transition-all shadow-md"
          aria-label={use3D ? 'Switch to High-Res Photo Mode' : 'Switch to 3D Sphere Mode'}
        >
          {use3D ? <ImageIcon size={13} /> : <Globe size={13} />}
          <span>{use3D ? 'Photo Mode' : '3D Sphere'}</span>
        </button>
      </div>

      {/* Right Control Buttons */}
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2 z-20">
        <button type="button" onClick={() => zoom(-8)} className={ctrl} aria-label="Zoom in">
          <Plus size={17} />
        </button>
        <button type="button" onClick={() => zoom(8)} className={ctrl} aria-label="Zoom out">
          <Minus size={17} />
        </button>
        {use3D && (
          <button
            type="button"
            onClick={() => setAutoRotate((a) => !a)}
            className={`${ctrl} ${autoRotate ? '!border-saffron-400 !text-saffron-300' : ''}`}
            aria-label={autoRotate ? 'Stop turning' : 'Turn slowly'}
            aria-pressed={autoRotate}
          >
            <RotateCw size={16} className={autoRotate ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
          </button>
        )}
        <button
          type="button"
          onClick={toggleFullscreen}
          className={ctrl}
          aria-label={fullscreen ? 'Exit full screen' : 'Full screen'}
        >
          {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Helper drag tip */}
      {!hinted && (
        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-parchment-200/15 bg-ink-950/75 px-4 py-2 text-xs text-parchment-100 backdrop-blur-md shadow-lg">
          Drag to look around, scroll to zoom
        </div>
      )}
    </div>
  );
}
