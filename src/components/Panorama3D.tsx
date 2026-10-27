import { Component, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useProgress, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Maximize2, Minimize2, Minus, Plus, RotateCw } from 'lucide-react';
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
// "photo" scenes sit on a curved wall; radius and height are chosen so the
// default field of view fills the frame without black bars.
const WALL_R = 20;
const WALL_H = 22;
const FOV_DEFAULT = 70;
const FOV_MIN = 30;
const FOV_MAX = 90;
const DEG = Math.PI / 180;

/** Camera state lives in a ref so dragging, auto-rotate and zoom never fight over React state. */
interface View {
  yaw: number;
  pitch: number;
  fov: number;
  vYaw: number; // inertia after a drag (rad/s)
  vPitch: number;
  autoRotate: boolean;
  panDir: 1 | -1; // direction of the gentle pan on photo walls
  dragging: boolean;
  /** Horizontal half-angle of a photo wall in radians; null for full 360° spheres. */
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
      // Stay inside the photo so no black edges show.
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

function SphereScene({ url }: { url: string }) {
  const texture = useSceneTexture(url);
  // Scaling x by -1 turns the sphere inside-out so the image reads the right way round.
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[SPHERE_R, 96, 64]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function PhotoWall({ url, onArc }: { url: string; onArc: (half: number) => void }) {
  const texture = useSceneTexture(url);
  const img = texture.image as { width: number; height: number };
  const aspect = img.width / img.height;
  // Arc length = aspect × height keeps the photo's proportions.
  const theta = Math.min(Math.PI * 1.6, (aspect * WALL_H) / WALL_R);

  useEffect(() => onArc(theta / 2), [theta, onArc]);

  return (
    <mesh scale={[-1, 1, 1]}>
      {/* open cylinder segment centred straight ahead (-Z) */}
      <cylinderGeometry args={[WALL_R, WALL_R, WALL_H, 96, 1, true, Math.PI - theta / 2, theta]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Loader() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-ink-950/75 backdrop-blur-sm">
      <div className="w-52 text-center">
        <div className="h-1 overflow-hidden rounded-full bg-parchment-200/15">
          <div
            className="h-full rounded-full bg-saffron-400 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-[13px] text-parchment-200/70">Loading scene… {Math.round(progress)}%</p>
      </div>
    </div>
  );
}

class SceneBoundary extends Component<{ children: ReactNode; resetKey: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidUpdate(prev: { resetKey: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.failed) this.setState({ failed: false });
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="absolute inset-0 grid place-items-center bg-ink-900 p-6 text-center">
          <div>
            <p className="font-display text-2xl text-parchment-100">This scene couldn’t load.</p>
            <p className="mt-2 text-sm text-parchment-200/60">Check your connection, then reload the page.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const ctrl =
  'grid h-10 w-10 place-items-center rounded-full border border-parchment-200/20 bg-ink-950/65 text-parchment-100 backdrop-blur-md transition-colors hover:border-saffron-400/60 hover:text-saffron-300';

export function Panorama3D({ url, kind, title, className = '', onFacingChange, captureRef }: Panorama3DProps) {
  const isSphere = kind === 'sphere';
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

  // Reset the camera whenever the scene changes; start a slow turn unless motion is reduced.
  useEffect(() => {
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
    view.current.fov = clamp(view.current.fov + delta, FOV_MIN, FOV_MAX);
  }, []);

  // Native, non-passive wheel listener so preventDefault works without console warnings.
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

  // Drag speed scales with zoom so the image tracks the pointer.
  const radPerPx = () => (view.current.fov * DEG) / (wrapRef.current?.clientHeight || 600);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    Object.assign(view.current, { dragging: true, vYaw: 0, vPitch: 0 });
    setAutoRotate(false);
    setHinted(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const now = performance.now();
    const k = radPerPx();
    const dYaw = (e.clientX - drag.current.x) * k;
    const dPitch = (e.clientY - drag.current.y) * k;
    const dt = Math.max(8, now - drag.current.t) / 1000;
    const v = view.current;
    // Grab-and-pull: the scene follows the pointer.
    v.yaw += dYaw;
    v.pitch += dPitch;
    v.vYaw = clamp(dYaw / dt, -4, 4);
    v.vPitch = clamp(dPitch / dt, -4, 4);
    drag.current = { x: e.clientX, y: e.clientY, t: now };
  };
  const endDrag = () => {
    drag.current = null;
    view.current.dragging = false;
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

  return (
    <div
      ref={wrapRef}
      className={`${className || 'relative h-[70vh]'} cursor-grab touch-none select-none overflow-hidden bg-ink-950 outline-none active:cursor-grabbing`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="application"
      aria-label={`${title}. ${isSphere ? '360 degree view' : 'Wide view'}: drag or use the arrow keys to look around, plus and minus to zoom.`}
    >
      <SceneBoundary resetKey={url}>
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
            {isSphere ? <SphereScene key={url} url={url} /> : <PhotoWall key={url} url={url} onArc={onArc} />}
          </Suspense>
          <Rig view={view} onHeading={setHeading} />
        </Canvas>
        </div>
        <Loader />
      </SceneBoundary>

      {isSphere ? (
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2.5 rounded-full border border-parchment-200/15 bg-ink-950/65 px-3.5 py-2 backdrop-blur-md">
          <span className="relative h-5 w-5 rounded-full border border-parchment-200/30" aria-hidden="true">
            <span className="absolute inset-0" style={{ transform: `rotate(${-heading}deg)` }}>
              <span className="absolute left-1/2 top-[2px] h-2 w-[2px] -translate-x-1/2 rounded-full bg-saffron-400" />
            </span>
          </span>
          <span className="text-[13px] font-semibold tabular-nums text-parchment-100">
            360° view, facing {compass}
          </span>
        </div>
      ) : (
        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-parchment-200/15 bg-ink-950/65 px-3.5 py-2 text-[13px] font-semibold text-parchment-100 backdrop-blur-md">
          Wide view
        </div>
      )}

      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        <button type="button" onClick={() => zoom(-8)} className={ctrl} aria-label="Zoom in">
          <Plus size={17} />
        </button>
        <button type="button" onClick={() => zoom(8)} className={ctrl} aria-label="Zoom out">
          <Minus size={17} />
        </button>
        <button
          type="button"
          onClick={() => setAutoRotate((a) => !a)}
          className={`${ctrl} ${autoRotate ? '!border-saffron-400 !text-saffron-300' : ''}`}
          aria-label={autoRotate ? 'Stop turning' : 'Turn slowly'}
          aria-pressed={autoRotate}
        >
          <RotateCw size={16} />
        </button>
        <button type="button" onClick={toggleFullscreen} className={ctrl} aria-label={fullscreen ? 'Exit full screen' : 'Full screen'}>
          {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {!hinted ? (
        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-parchment-200/15 bg-ink-950/70 px-4 py-2 text-[13px] text-parchment-100 backdrop-blur-md">
          Drag to look around, scroll to zoom
        </div>
      ) : null}
    </div>
  );
}
