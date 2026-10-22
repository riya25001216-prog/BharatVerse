import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Edges, Line, OrbitControls, Sparkles, Text } from '@react-three/drei';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { geoConicEqualArea, geoStream } from 'd3-geo';
import type { Feature } from 'geojson';
import { COLLECTION } from '../lib/geo';
import { STATE_BY_ID, REGION_COLORS } from '../data/states';

/**
 * Conic equal-area projection, centred on 80°E — the standard way to draw
 * India without the usual Mercator stretching.
 */
const PROJECTION = geoConicEqualArea()
  .parallels([8, 36])
  .rotate([-80, 0])
  .center([0, 22])
  .fitExtent(
    [
      [-46, -46],
      [46, 46],
    ],
    COLLECTION as never
  );

/** Visual gap left between neighbouring states, in projected units. */
const GAP = 0.34;

type Ring = number[][];
type Polygon = Ring[];

interface StateShape {
  id: string;
  name: string;
  accent: string;
  region: string;
  geometry: THREE.BufferGeometry;
  /** Centre of the state's largest landmass, in map space (x, z). */
  anchor: [number, number];
  depth: number;
  /** True for the island territories, which are scattered specks. */
  island: boolean;
}

/** Streams a feature into projected polygons of rings, preserving holes. */
function projectedPolygons(feature: Feature): Polygon[] {
  const polygons: Polygon[] = [];
  let poly: Polygon | null = null;
  let ring: Ring | null = null;

  geoStream(feature, {
    polygonStart: () => {
      poly = [];
    },
    polygonEnd: () => {
      if (poly) polygons.push(poly);
      poly = null;
    },
    lineStart: () => {
      ring = [];
    },
    lineEnd: () => {
      if (poly && ring) poly.push(ring);
      ring = null;
    },
    point: (x: number, y: number) => {
      if (!ring) return;
      const p = PROJECTION([x, y]);
      // d3 projects with y pointing down; the map is built north-positive.
      if (p) ring.push([p[0], -p[1]]);
    },
  } as never);

  return polygons;
}

/** Signed area of a ring. */
function ringArea(ring: Ring): number {
  let a = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    a += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  }
  return a / 2;
}

/** Area-weighted centroid of a ring (falls back to the vertex average). */
function ringCentroid(ring: Ring): [number, number] {
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const f = ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
    a += f;
    cx += (ring[j][0] + ring[i][0]) * f;
    cy += (ring[j][1] + ring[i][1]) * f;
  }
  if (Math.abs(a) < 1e-9) {
    let x = 0;
    let y = 0;
    for (const p of ring) {
      x += p[0];
      y += p[1];
    }
    return [x / ring.length, y / ring.length];
  }
  a *= 3;
  return [cx / a, cy / a];
}

/**
 * Pushes a ring away from (or towards) its own centre by roughly `gap` units.
 * Outer rings shrink so neighbouring states separate; holes grow so that
 * enclaves such as Bangladesh and Bhutan also gain a visible seam.
 */
function offsetRing(ring: Ring, gap: number, expand: boolean): Ring {
  const [cx, cy] = ringCentroid(ring);
  let meanR = 0;
  for (const p of ring) meanR += Math.hypot(p[0] - cx, p[1] - cy);
  meanR /= ring.length;
  if (meanR < 1e-6) return ring;
  const d = gap / meanR;
  const k = expand ? 1 + Math.min(d, 0.22) : Math.max(1 - Math.min(d, 0.13), 0.87);
  return ring.map(([x, y]) => [cx + (x - cx) * k, cy + (y - cy) * k]);
}

function buildShapes(): StateShape[] {
  return COLLECTION.features.map((feature) => {
    const id = feature.properties.id;
    const story = STATE_BY_ID[id];
    const polygons = projectedPolygons(feature as unknown as Feature);

    let biggest: Polygon | null = null;
    let biggestArea = -Infinity;
    for (const poly of polygons) {
      const area = Math.abs(ringArea(poly[0] ?? []));
      if (area > biggestArea) {
        biggestArea = area;
        biggest = poly;
      }
    }

    const anchorRing = biggest?.[0] ?? [];
    const [ax, ay] = anchorRing.length ? ringCentroid(anchorRing) : ([0, 0] as [number, number]);

    const hash = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const depth = 2.6 + (hash % 7) * 1.05;

    // One geometry per state: every landmass merged so the whole state
    // highlights and lifts as a single object.
    const parts: THREE.BufferGeometry[] = [];
    for (const poly of polygons) {
      const outer = offsetRing(poly[0] ?? [], GAP, false);
      if (outer.length < 3) continue;

      const shape = new THREE.Shape();
      shape.moveTo(outer[0][0], outer[0][1]);
      for (let i = 1; i < outer.length; i++) shape.lineTo(outer[i][0], outer[i][1]);
      shape.closePath();

      for (let i = 1; i < poly.length; i++) {
        const hole = offsetRing(poly[i], GAP, true);
        if (hole.length < 3) continue;
        const path = new THREE.Path();
        path.moveTo(hole[0][0], hole[0][1]);
        for (let j = 1; j < hole.length; j++) path.lineTo(hole[j][0], hole[j][1]);
        path.closePath();
        shape.holes.push(path);
      }

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelSize: 0.22,
        bevelThickness: 0.22,
        bevelOffset: 0,
        bevelSegments: 1,
        curveSegments: 1,
        steps: 1,
      });
      // Lay the extrusion flat: shape X → world X, north → world −Z, depth → world +Y.
      geo.rotateX(-Math.PI / 2);
      geo.computeVertexNormals();
      parts.push(geo);
    }

    const geometry = parts.length
      ? (mergeGeometries(parts, false) ?? parts[0])
      : new THREE.BufferGeometry();
    if (parts.length > 1) parts.forEach((p) => p.dispose());

    return {
      id,
      name: feature.properties.name,
      accent: story?.accent ?? '#ffffff',
      region: story?.region ?? 'North',
      geometry,
      anchor: [ax, -ay],
      depth,
      island: polygons.length > 6 || biggestArea < 12,
    };
  });
}

const SHAPES = buildShapes();

/** Overall footprint of the map, used to frame the camera. */
const FOOTPRINT = (() => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (const s of SHAPES) {
    s.geometry.computeBoundingBox();
    const b = s.geometry.boundingBox;
    if (!b) continue;
    minX = Math.min(minX, b.min.x);
    maxX = Math.max(maxX, b.max.x);
    minZ = Math.min(minZ, b.min.z);
    maxZ = Math.max(maxZ, b.max.z);
  }
  return {
    minX,
    maxX,
    minZ,
    maxZ,
    width: maxX - minX,
    depth: maxZ - minZ,
    cx: (minX + maxX) / 2,
    cz: (minZ + maxZ) / 2,
  };
})();

/** Distance at which the whole footprint fits the frame for a given aspect. */
function fitDistance(fovDeg: number, aspect: number, elevation: number): number {
  const fovV = THREE.MathUtils.degToRad(fovDeg);
  const fovH = 2 * Math.atan(Math.tan(fovV / 2) * Math.max(0.35, aspect));
  const height = 10;
  const vExtent = FOOTPRINT.depth * Math.sin(elevation) + height * Math.cos(elevation);
  const distV = vExtent / 2 / Math.tan(fovV / 2);
  const distH = FOOTPRINT.width / 2 / Math.tan(fovH / 2);
  return Math.max(distV, distH) * 1.14;
}

function StateMesh({
  data,
  hovered,
  selected,
  dimmed,
  onHover,
  onSelect,
}: {
  data: StateShape;
  hovered: boolean;
  selected: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const lift = useRef(0);
  const active = hovered || selected;

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const k = Math.min(1, delta * 7);
    lift.current = THREE.MathUtils.lerp(lift.current, active ? 3.2 : 0, k);
    mesh.current.position.y = lift.current;

    const mat = mesh.current.material as THREE.MeshStandardMaterial;
    const targetOpacity = dimmed ? 0.22 : 1;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, k);
    mat.emissiveIntensity = THREE.MathUtils.lerp(
      mat.emissiveIntensity,
      active ? 0.85 : dimmed ? 0.08 : 0.26,
      k
    );
  });

  const base = REGION_COLORS[data.region] ?? '#8892b0';
  const color = selected ? data.accent : base;

  return (
    <mesh
      ref={mesh}
      geometry={data.geometry}
      castShadow
      receiveShadow
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(data.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(data.id);
      }}
    >
      <meshStandardMaterial
        color={color}
        emissive={data.accent}
        emissiveIntensity={0.26}
        metalness={0.35}
        roughness={0.42}
        transparent
        opacity={1}
      />
      <Edges
        threshold={22}
        scale={1.002}
        color={active ? '#fff6e2' : data.accent}
        transparent
        opacity={active ? 0.95 : 0.35}
      />
    </mesh>
  );
}

function Route({ route }: { route: string[] }) {
  const points = useMemo(() => {
    const out: [number, number, number][] = [];
    for (const id of route) {
      const s = SHAPES.find((x) => x.id === id);
      if (s) out.push([s.anchor[0], s.depth + 2.4, s.anchor[1]]);
    }
    return out;
  }, [route]);

  const marker = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!marker.current || points.length < 2) return;
    const t = (state.clock.elapsedTime * 0.055) % 1;
    const idx = t * (points.length - 1);
    const i = Math.floor(idx);
    const j = Math.min(points.length - 1, i + 1);
    const f = idx - i;
    const x = THREE.MathUtils.lerp(points[i][0], points[j][0], f);
    const y = THREE.MathUtils.lerp(points[i][1], points[j][1], f);
    const z = THREE.MathUtils.lerp(points[i][2], points[j][2], f);
    marker.current.position.set(x, y, z);
    if (glow.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3.2) * 0.22;
      glow.current.position.set(x, y, z);
      glow.current.scale.setScalar(s);
    }
  });

  if (points.length < 2) return null;

  return (
    <group>
      <Line points={points} color="#ffc46b" lineWidth={3.4} transparent opacity={0.9} />
      <Line points={points} color="#fff6de" lineWidth={1.1} transparent opacity={0.55} />
      <mesh ref={marker}>
        <sphereGeometry args={[1.15, 24, 24]} />
        <meshBasicMaterial color="#fff6de" />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[2.2, 20, 20]} />
        <meshBasicMaterial color="#ffc46b" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <pointLight color="#ffc46b" intensity={14} distance={34} decay={2} position={points[0]} />
    </group>
  );
}

/**
 * Frames the map for the container's aspect ratio and flies the orbit target
 * to whichever state is focused.
 */
function CameraRig({
  focus,
  fov,
  elevation,
  autoRotate,
}: {
  focus: [number, number] | null;
  fov: number;
  elevation: number;
  autoRotate: boolean;
}) {  const controls = useRef<any>(null);
  const { camera, size } = useThree();
  const desired = useRef(new THREE.Vector3(FOOTPRINT.cx, 0, FOOTPRINT.cz));
  const initialised = useRef(false);

  const applyFit = useCallback(() => {
    const aspect = size.width / Math.max(1, size.height);
    const dist = fitDistance(fov, aspect, elevation);
    const dir = new THREE.Vector3(0, Math.sin(elevation), Math.cos(elevation));
    camera.position.copy(desired.current).addScaledVector(dir, dist);
    camera.lookAt(desired.current);
    controls.current?.target.copy(desired.current);
    controls.current?.update();
  }, [camera, size, fov, elevation]);

  useEffect(() => {
    applyFit();
    initialised.current = true;
  }, [applyFit]);

  useEffect(() => {
    if (!focus) return;
    desired.current.set(focus[0], 0, focus[1]);
  }, [focus]);

  useFrame((_, delta) => {
    const c = controls.current;
    if (!c) return;
    const k = Math.min(1, delta * 2.2);
    const prev = c.target.clone();
    c.target.lerp(desired.current, k);
    const shift = c.target.clone().sub(prev);
    camera.position.add(shift);
    c.update();
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.09}
      minDistance={30}
      maxDistance={190}
      minPolarAngle={0.12}
      maxPolarAngle={Math.PI / 2.15}
      autoRotate={autoRotate}
      autoRotateSpeed={0.4}
      target={[FOOTPRINT.cx, 0, FOOTPRINT.cz]}
    />
  );
}

function Scene({
  selectedId,
  route,
  onSelect,
  focusId,
  fov,
  elevation,
  autoRotate,
}: {
  selectedId: string | null;
  route?: string[];
  onSelect: (id: string) => void;
  focusId?: string | null;
  fov: number;
  elevation: number;
  autoRotate: boolean;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const focus = useMemo(() => {
    const id = focusId ?? selectedId;
    if (!id) return null;
    const s = SHAPES.find((x) => x.id === id);
    return s ? ([s.anchor[0], s.anchor[1]] as [number, number]) : null;
  }, [focusId, selectedId]);

  return (
    <>
      <hemisphereLight args={['#bcd4ff', '#0b1020', 0.85]} />
      <ambientLight intensity={0.42} />
      <directionalLight
        position={[46, 78, 34]}
        intensity={1.5}
        color="#fff2dc"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-70}
        shadow-camera-near={1}
        shadow-camera-far={220}
        shadow-bias={-0.0012}
        shadow-normalBias={0.04}
      />
      <directionalLight position={[-62, 34, -46]} intensity={0.5} color="#8fa3ff" />
      <pointLight position={[0, 26, 40]} intensity={0.5} color="#ffc46b" distance={150} decay={1.6} />

      <group>
        {SHAPES.map((s) => (
          <StateMesh
            key={s.id}
            data={s}
            hovered={hovered === s.id}
            selected={selectedId === s.id}
            dimmed={!!selectedId && selectedId !== s.id}
            onHover={setHovered}
            onSelect={onSelect}
          />
        ))}
      </group>

      {route && route.length > 1 ? <Route route={route} /> : null}

      {/* soft grounding shadow — a soft blob, not a hard disc */}
      <ContactShadows
        position={[FOOTPRINT.cx, -0.35, FOOTPRINT.cz]}
        scale={125}
        opacity={0.2}
        blur={3.2}
        far={16}
        resolution={512}
        color="#05070f"
        frames={Infinity}
      />

      <Sparkles
        count={70}
        position={[FOOTPRINT.cx, 14, FOOTPRINT.cz]}
        scale={[110, 26, 110]}
        size={1.5}
        speed={0.18}
        opacity={0.35}
        color="#ffd9a0"
      />

      <CameraRig
        focus={focus}
        fov={fov}
        elevation={elevation}
        autoRotate={autoRotate}
      />
    </>
  );
}

export interface India3DProps {
  selectedId?: string | null;
  focusId?: string | null;
  route?: string[];
  onSelect?: (id: string) => void;
  className?: string;
  /** Camera field of view in degrees. */
  fov?: number;
  /** Camera elevation above the horizon, in degrees. */
  elevation?: number;
  /** Slowly orbit the camera. Off by default so the map stays readable. */
  autoRotate?: boolean;
}

export function India3D({
  selectedId = null,
  focusId = null,
  route,
  onSelect,
  className = '',
  fov = 40,
  elevation = 52,
  autoRotate = false,
}: India3DProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 88, 68], fov }}
        gl={{ antialias: true, alpha: true }}
        onPointerMissed={() => onSelect?.('')}
      >
        <Scene
          selectedId={selectedId}
          route={route}
          onSelect={onSelect ?? (() => {})}
          focusId={focusId}
          fov={fov}
          elevation={elevation}
          autoRotate={autoRotate}
        />
      </Canvas>
    </div>
  );
}

/** Screen-space label for a state, used by the guide's route callouts. */
export function MapLabel({ text, position }: { text: string; position: [number, number, number] }) {
  return (
    <Text
      position={position}
      fontSize={2.6}
      color="#fff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.08}
      outlineColor="#000"
    >
      {text}
    </Text>
  );
}
