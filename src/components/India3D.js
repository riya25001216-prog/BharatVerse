import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Edges, Line, OrbitControls, Sparkles, Text } from '@react-three/drei';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { geoConicEqualArea, geoStream } from 'd3-geo';
import { Plus, Minus, RotateCw, RefreshCw } from 'lucide-react';
import { COLLECTION } from '../lib/geo';
import { STATE_BY_ID, REGION_COLORS } from '../data/states';
import { SafeImage } from './SafeImage';
import { imagePath } from '../lib/assets';
/**
 * Conic equal-area projection, centred on 80°E — the standard way to draw
 * India without the usual Mercator stretching.
 */
const PROJECTION = geoConicEqualArea()
    .parallels([8, 36])
    .rotate([-80, 0])
    .center([0, 22])
    .fitExtent([
    [-46, -46],
    [46, 46],
], COLLECTION);
/** Visual gap left between neighbouring states, in projected units. */
const GAP = 0.34;
/** Streams a feature into projected polygons of rings, preserving holes. */
function projectedPolygons(feature) {
    const polygons = [];
    let poly = null;
    let ring = null;
    geoStream(feature, {
        polygonStart: () => {
            poly = [];
        },
        polygonEnd: () => {
            if (poly)
                polygons.push(poly);
            poly = null;
        },
        lineStart: () => {
            ring = [];
        },
        lineEnd: () => {
            if (poly && ring)
                poly.push(ring);
            ring = null;
        },
        point: (x, y) => {
            if (!ring)
                return;
            const p = PROJECTION([x, y]);
            // d3 projects with y pointing down; the map is built north-positive.
            if (p)
                ring.push([p[0], -p[1]]);
        },
    });
    return polygons;
}
/** Signed area of a ring. */
function ringArea(ring) {
    let a = 0;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        a += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
    }
    return a / 2;
}
/** Area-weighted centroid of a ring (falls back to the vertex average). */
function ringCentroid(ring) {
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
function offsetRing(ring, gap, expand) {
    const [cx, cy] = ringCentroid(ring);
    let meanR = 0;
    for (const p of ring)
        meanR += Math.hypot(p[0] - cx, p[1] - cy);
    meanR /= ring.length;
    if (meanR < 1e-6)
        return ring;
    const d = gap / meanR;
    const k = expand ? 1 + Math.min(d, 0.22) : Math.max(1 - Math.min(d, 0.13), 0.87);
    return ring.map(([x, y]) => [cx + (x - cx) * k, cy + (y - cy) * k]);
}
function buildShapes() {
    return COLLECTION.features.map((feature) => {
        const id = feature.properties.id;
        const story = STATE_BY_ID[id];
        const polygons = projectedPolygons(feature);
        let biggest = null;
        let biggestArea = -Infinity;
        for (const poly of polygons) {
            const area = Math.abs(ringArea(poly[0] ?? []));
            if (area > biggestArea) {
                biggestArea = area;
                biggest = poly;
            }
        }
        const anchorRing = biggest?.[0] ?? [];
        const [ax, ay] = anchorRing.length ? ringCentroid(anchorRing) : [0, 0];
        const hash = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        const depth = 2.6 + (hash % 7) * 1.05;
        // One geometry per state: every landmass merged so the whole state
        // highlights and lifts as a single object.
        const parts = [];
        for (const poly of polygons) {
            const outer = offsetRing(poly[0] ?? [], GAP, false);
            if (outer.length < 3)
                continue;
            const shape = new THREE.Shape();
            shape.moveTo(outer[0][0], outer[0][1]);
            for (let i = 1; i < outer.length; i++)
                shape.lineTo(outer[i][0], outer[i][1]);
            shape.closePath();
            for (let i = 1; i < poly.length; i++) {
                const hole = offsetRing(poly[i], GAP, true);
                if (hole.length < 3)
                    continue;
                const path = new THREE.Path();
                path.moveTo(hole[0][0], hole[0][1]);
                for (let j = 1; j < hole.length; j++)
                    path.lineTo(hole[j][0], hole[j][1]);
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
        if (parts.length > 1)
            parts.forEach((p) => p.dispose());
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
        if (!b)
            continue;
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
function fitDistance(fovDeg, aspect, elevation) {
    const fovV = THREE.MathUtils.degToRad(fovDeg);
    const fovH = 2 * Math.atan(Math.tan(fovV / 2) * Math.max(0.35, aspect));
    const height = 10;
    const vExtent = FOOTPRINT.depth * Math.sin(elevation) + height * Math.cos(elevation);
    const distV = vExtent / 2 / Math.tan(fovV / 2);
    const distH = FOOTPRINT.width / 2 / Math.tan(fovH / 2);
    return Math.max(distV, distH) * 1.14;
}
function StateMesh({ data, hovered, selected, dimmed, onHover, onSelect, }) {
    const mesh = useRef(null);
    const lift = useRef(0);
    const active = hovered || selected;
    useFrame((_, delta) => {
        if (!mesh.current)
            return;
        const k = Math.min(1, delta * 7);
        lift.current = THREE.MathUtils.lerp(lift.current, active ? 3.2 : 0, k);
        mesh.current.position.y = lift.current;
        const mat = mesh.current.material;
        const targetOpacity = dimmed ? 0.22 : 1;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, k);
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, active ? 0.85 : dimmed ? 0.08 : 0.26, k);
    });
    const base = REGION_COLORS[data.region] ?? '#8892b0';
    const color = selected ? data.accent : base;
    return (_jsxs("mesh", { ref: mesh, geometry: data.geometry, castShadow: true, receiveShadow: true, onPointerOver: (e) => {
            e.stopPropagation();
            onHover(data.id);
            document.body.style.cursor = 'pointer';
        }, onPointerOut: () => {
            onHover(null);
            document.body.style.cursor = 'auto';
        }, onClick: (e) => {
            e.stopPropagation();
            onSelect(data.id);
        }, children: [_jsx("meshStandardMaterial", { color: color, emissive: data.accent, emissiveIntensity: 0.26, metalness: 0.35, roughness: 0.42, transparent: true, opacity: 1 }), _jsx(Edges, { threshold: 22, scale: 1.002, color: active ? '#fff6e2' : data.accent, transparent: true, opacity: active ? 0.95 : 0.35 })] }));
}
function Route({ route }) {
    const points = useMemo(() => {
        const out = [];
        for (const id of route) {
            const s = SHAPES.find((x) => x.id === id);
            if (s)
                out.push([s.anchor[0], s.depth + 2.4, s.anchor[1]]);
        }
        return out;
    }, [route]);
    const marker = useRef(null);
    const glow = useRef(null);
    useFrame((state) => {
        if (!marker.current || points.length < 2)
            return;
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
    if (points.length < 2)
        return null;
    return (_jsxs("group", { children: [_jsx(Line, { points: points, color: "#F6C46F", lineWidth: 3.4, transparent: true, opacity: 0.9 }), _jsx(Line, { points: points, color: "#fff6de", lineWidth: 1.1, transparent: true, opacity: 0.55 }), _jsxs("mesh", { ref: marker, children: [_jsx("sphereGeometry", { args: [1.15, 24, 24] }), _jsx("meshBasicMaterial", { color: "#fff6de" })] }), _jsxs("mesh", { ref: glow, children: [_jsx("sphereGeometry", { args: [2.2, 20, 20] }), _jsx("meshBasicMaterial", { color: "#F6C46F", transparent: true, opacity: 0.22, depthWrite: false })] }), _jsx("pointLight", { color: "#F6C46F", intensity: 14, distance: 34, decay: 2, position: points[0] })] }));
}
/**
 * Frames the map for the container's aspect ratio and flies the orbit target
 * to whichever state is focused.
 */
function CameraRig({ focus, fov, elevation, autoRotate, }) {
    const controls = useRef(null);
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
        if (!focus)
            return;
        desired.current.set(focus[0], 0, focus[1]);
    }, [focus]);
    useFrame((_, delta) => {
        const c = controls.current;
        if (!c)
            return;
        const k = Math.min(1, delta * 2.2);
        const prev = c.target.clone();
        c.target.lerp(desired.current, k);
        const shift = c.target.clone().sub(prev);
        camera.position.add(shift);
        c.update();
    });
    return (_jsx(OrbitControls, { ref: controls, makeDefault: true, enablePan: false, enableDamping: true, dampingFactor: 0.09, minDistance: 30, maxDistance: 190, minPolarAngle: 0.12, maxPolarAngle: Math.PI / 2.15, autoRotate: autoRotate, autoRotateSpeed: 0.4, target: [FOOTPRINT.cx, 0, FOOTPRINT.cz] }));
}
function Scene({ selectedId, route, onSelect, focusId, fov, elevation, autoRotate, onHoverChange, }) {
    const [hovered, setHovered] = useState(null);
    const handleHover = (id) => {
        setHovered(id);
        onHoverChange?.(id);
    };
    const focus = useMemo(() => {
        const id = focusId ?? selectedId;
        if (!id)
            return null;
        const s = SHAPES.find((x) => x.id === id);
        return s ? [s.anchor[0], s.anchor[1]] : null;
    }, [focusId, selectedId]);
    return (_jsxs(_Fragment, { children: [_jsx("hemisphereLight", { args: ['#bcd4ff', '#0b1020', 0.85] }), _jsx("ambientLight", { intensity: 0.42 }), _jsx("directionalLight", { position: [46, 78, 34], intensity: 1.5, color: "#fff2dc", castShadow: true, "shadow-mapSize": [2048, 2048], "shadow-camera-left": -70, "shadow-camera-right": 70, "shadow-camera-top": 70, "shadow-camera-bottom": -70, "shadow-camera-near": 1, "shadow-camera-far": 220, "shadow-bias": -0.0012, "shadow-normalBias": 0.04 }), _jsx("directionalLight", { position: [-62, 34, -46], intensity: 0.5, color: "#8fa3ff" }), _jsx("pointLight", { position: [0, 26, 40], intensity: 0.5, color: "#F6C46F", distance: 150, decay: 1.6 }), _jsx("group", { children: SHAPES.map((s) => (_jsx(StateMesh, { data: s, hovered: hovered === s.id, selected: selectedId === s.id, dimmed: !!selectedId && selectedId !== s.id, onHover: handleHover, onSelect: onSelect }, s.id))) }), route && route.length > 1 ? _jsx(Route, { route: route }) : null, _jsx(ContactShadows, { position: [FOOTPRINT.cx, -0.35, FOOTPRINT.cz], scale: 125, opacity: 0.2, blur: 3.2, far: 16, resolution: 512, color: "#05070f", frames: Infinity }), _jsx(Sparkles, { count: 70, position: [FOOTPRINT.cx, 14, FOOTPRINT.cz], scale: [110, 26, 110], size: 1.5, speed: 0.18, opacity: 0.35, color: "#ffd9a0" }), _jsx(CameraRig, { focus: focus, fov: fov, elevation: elevation, autoRotate: autoRotate })] }));
}
export function India3D({ selectedId = null, focusId = null, route, onSelect, className = '', fov = 40, elevation = 52, autoRotate = false, }) {
    const [hoveredId, setHoveredId] = useState(null);
    const [currentFov, setCurrentFov] = useState(fov);
    const [isRotating, setIsRotating] = useState(autoRotate);
    const hoveredState = hoveredId ? STATE_BY_ID[hoveredId] : null;
    const zoomIn = () => setCurrentFov((f) => Math.max(20, f - 5));
    const zoomOut = () => setCurrentFov((f) => Math.min(65, f + 5));
    const resetView = () => {
        setCurrentFov(fov);
        setIsRotating(false);
    };
    const isAbsolute = className.includes('absolute');
    const basePosition = isAbsolute ? '' : 'relative';
    return (_jsxs("div", { className: `${basePosition} h-full w-full overflow-hidden ${className}`, children: [_jsx(Canvas, { shadows: true, dpr: [1, 1.75], camera: { position: [0, 88, 68], fov: currentFov }, gl: { antialias: true, alpha: true }, onPointerMissed: () => onSelect?.(''), children: _jsx(Scene, { selectedId: selectedId, route: route, onSelect: onSelect ?? (() => { }), focusId: focusId, fov: currentFov, elevation: elevation, autoRotate: isRotating, onHoverChange: setHoveredId }) }), _jsxs("div", { className: "absolute right-4 top-4 z-20 flex flex-col gap-1.5", children: [_jsx("button", { type: "button", onClick: zoomIn, className: "grid h-8 w-8 place-items-center rounded-lg border border-parchment-200/20 bg-ink-950/70 text-parchment-100 backdrop-blur-md transition-colors hover:border-saffron-400 hover:text-saffron-300", "aria-label": "Zoom in", children: _jsx(Plus, { size: 15 }) }), _jsx("button", { type: "button", onClick: zoomOut, className: "grid h-8 w-8 place-items-center rounded-lg border border-parchment-200/20 bg-ink-950/70 text-parchment-100 backdrop-blur-md transition-colors hover:border-saffron-400 hover:text-saffron-300", "aria-label": "Zoom out", children: _jsx(Minus, { size: 15 }) }), _jsx("button", { type: "button", onClick: () => setIsRotating((r) => !r), className: `grid h-8 w-8 place-items-center rounded-lg border border-parchment-200/20 bg-ink-950/70 backdrop-blur-md transition-colors ${isRotating ? 'border-saffron-400 text-saffron-300' : 'text-parchment-100 hover:text-saffron-300'}`, "aria-label": isRotating ? 'Stop orbit' : 'Orbit map', children: _jsx(RotateCw, { size: 14, className: isRotating ? 'animate-spin' : '' }) }), _jsx("button", { type: "button", onClick: resetView, className: "grid h-8 w-8 place-items-center rounded-lg border border-parchment-200/20 bg-ink-950/70 text-parchment-100 backdrop-blur-md transition-colors hover:border-saffron-400 hover:text-saffron-300", "aria-label": "Reset map angle", children: _jsx(RefreshCw, { size: 13 }) })] }), hoveredState && (_jsxs("div", { onClick: () => onSelect?.(hoveredState.id), className: "pointer-events-auto absolute bottom-4 left-4 z-20 flex max-w-sm cursor-pointer items-center gap-3.5 rounded-2xl border border-saffron-400/40 bg-ink-950/90 p-2.5 shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.02]", children: [_jsx("div", { className: "relative h-14 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10", children: _jsx(SafeImage, { src: imagePath(hoveredState.image), alt: hoveredState.name, className: "h-full w-full object-cover" }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "h-2 w-2 shrink-0 rounded-full", style: { background: REGION_COLORS[hoveredState.region] || '#F6C46F' } }), _jsx("span", { className: "truncate text-xs font-semibold text-parchment-100", children: hoveredState.name }), _jsx("span", { className: "rounded bg-white/10 px-1.5 py-0.2 text-[9px] text-parchment-200/60", children: hoveredState.type })] }), _jsxs("div", { className: "truncate text-[11px] text-parchment-200/60", children: ["Capital: ", hoveredState.capital] }), _jsx("div", { className: "text-[10px] text-saffron-400 font-medium", children: "Click to open dedicated detail page \u2197" })] })] }))] }));
}
/** Screen-space label for a state, used by the guide's route callouts. */
export function MapLabel({ text, position }) {
    return (_jsx(Text, { position: position, fontSize: 2.6, color: "#fff", anchorX: "center", anchorY: "middle", outlineWidth: 0.08, outlineColor: "#000", children: text }));
}
