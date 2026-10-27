import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { geoConicEqualArea, geoPath } from 'd3-geo';
import rawStates from '../data/india-states.json';
import { STATE_BY_ID, REGION_COLORS } from '../data/states';
const COLLECTION = rawStates;
const ISLAND_IDS = ['andaman-and-nicobar-islands', 'lakshadweep'];
/**
 * The Andaman & Nicobar and Lakshadweep groups sit 20 degrees apart, so each
 * gets its own magnified inset, the way the Survey of India maps do it.
 */
const ISLAND_INSETS = [
    { id: 'andaman-and-nicobar-islands', label: 'A & N ISLANDS', box: { x: 24, y: 742, w: 152, h: 150 } },
    { id: 'lakshadweep', label: 'LAKSHADWEEP', box: { x: 24, y: 908, w: 152, h: 150 } },
];
const MAIN_W = 1000;
const MAIN_H = 1080;
const buildProjection = (features, size, pad = 14, boost = 1) => {
    const collection = { type: 'FeatureCollection', features };
    const projection = geoConicEqualArea()
        .parallels([8, 36])
        .rotate([-80, 0])
        .center([0, 22]);
    projection.fitExtent([
        [pad, pad],
        [size.w - pad, size.h - pad],
    ], collection);
    if (boost !== 1) {
        // The islands are tiny next to the mainland, so the inset view is
        // magnified and then re-centred on its own bounds.
        const scaled = geoConicEqualArea()
            .parallels([8, 36])
            .rotate([-80, 0])
            .center([0, 22])
            .scale(projection.scale() * boost);
        const bounds = geoPath(scaled).bounds(collection);
        const dx = size.w / 2 - (bounds[0][0] + bounds[1][0]) / 2;
        const dy = size.h / 2 - (bounds[0][1] + bounds[1][1]) / 2;
        scaled.translate([scaled.translate()[0] + dx, scaled.translate()[1] + dy]);
        return scaled;
    }
    return projection;
};
export function IndiaMap({ selectedId, onSelect, regionFilter, query, compact = false }) {
    const [hovered, setHovered] = useState(null);
    const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
    const dragState = useRef(null);
    const svgRef = useRef(null);
    const mainFeatures = useMemo(() => COLLECTION.features.filter((f) => !ISLAND_IDS.includes(f.properties.id)), []);
    const islandFeatures = useMemo(() => COLLECTION.features.filter((f) => ISLAND_IDS.includes(f.properties.id)), []);
    const mainProjection = useMemo(() => buildProjection(mainFeatures, { w: MAIN_W, h: MAIN_H }, compact ? 26 : 18), [mainFeatures, compact]);
    const islandProjections = useMemo(() => ISLAND_INSETS.map((inset) => {
        const feature = islandFeatures.find((f) => f.properties.id === inset.id);
        const projection = feature
            ? buildProjection([feature], { w: inset.box.w, h: inset.box.h }, 12)
            : null;
        return { inset, projection, path: projection ? geoPath(projection) : null };
    }), [islandFeatures]);
    const mainPath = useMemo(() => geoPath(mainProjection), [mainProjection]);
    const matched = useMemo(() => {
        if (!query.trim())
            return null;
        const q = query.trim().toLowerCase();
        return new Set(COLLECTION.features
            .filter((f) => {
            const story = STATE_BY_ID[f.properties.id];
            return (f.properties.name.toLowerCase().includes(q) ||
                f.properties.capital.toLowerCase().includes(q) ||
                (story?.languages ?? []).some((l) => l.toLowerCase().includes(q)) ||
                (story?.landmarks ?? []).some((l) => l.name.toLowerCase().includes(q)));
        })
            .map((f) => f.properties.id));
    }, [query]);
    const isDimmed = useCallback((id) => {
        const story = STATE_BY_ID[id];
        const regionOk = regionFilter === 'All' || story?.region === regionFilter;
        const matchOk = !matched || matched.has(id);
        return !regionOk || !matchOk;
    }, [regionFilter, matched]);
    const fillFor = (id) => {
        const story = STATE_BY_ID[id];
        if (!story)
            return 'rgba(255,255,255,0.07)';
        if (selectedId === id)
            return story.accent;
        if (matched && matched.has(id))
            return 'rgba(246, 196, 111,0.6)';
        return REGION_COLORS[story.region] ?? 'rgba(255,255,255,0.07)';
    };
    const opacityFor = (id) => {
        if (isDimmed(id))
            return 0.16;
        if (selectedId === id)
            return 0.95;
        if (hovered === id)
            return 0.8;
        if (matched)
            return matched.has(id) ? 0.9 : 0.2;
        return 0.42;
    };
    // ---- zoom & pan -------------------------------------------------------
    const clamp = (t) => {
        const scale = Math.min(6, Math.max(1, t.scale));
        const limit = 1 - 1 / scale;
        return {
            scale,
            x: Math.max(-(limit * MAIN_W) / 1, Math.min((limit * MAIN_W) / 1, t.x)),
            y: Math.max(-(limit * MAIN_H) / 1, Math.min((limit * MAIN_H) / 1, t.y)),
        };
    };
    const onWheel = (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
        setTransform((t) => clamp({ scale: t.scale * factor, x: t.x, y: t.y }));
    };
    const onPointerDown = (e) => {
        e.target.setPointerCapture?.(e.pointerId);
        dragState.current = { x: e.clientX, y: e.clientY, ox: transform.x, oy: transform.y };
    };
    const onPointerMove = (e) => {
        const d = dragState.current;
        if (!d)
            return;
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect)
            return;
        const k = MAIN_W / rect.width;
        setTransform((t) => clamp({ scale: t.scale, x: d.ox + (e.clientX - d.x) * k, y: d.oy + (e.clientY - d.y) * k }));
    };
    const onPointerUp = () => {
        dragState.current = null;
    };
    useEffect(() => {
        const el = svgRef.current;
        if (!el)
            return;
        const handler = (e) => e.preventDefault();
        el.addEventListener('wheel', handler, { passive: false });
        return () => el.removeEventListener('wheel', handler);
    }, []);
    const reset = () => setTransform({ scale: 1, x: 0, y: 0 });
    const renderFeatures = (features, pathFn, isInset) => features.map((f, i) => {
        const id = f.properties.id;
        const d = pathFn(f) ?? '';
        const isSelected = selectedId === id;
        const isHovered = hovered === id;
        return (_jsx(motion.path, { d: d, initial: isInset ? { opacity: 0 } : { pathLength: 0, opacity: 0 }, animate: isInset ? { opacity: 0.9 } : { pathLength: 1, opacity: 1 }, transition: {
                pathLength: { duration: 1.6, delay: 0.15 + i * 0.035, ease: 'easeInOut' },
                opacity: { duration: 0.6, delay: 0.1 + i * 0.03 },
            }, onMouseEnter: () => setHovered(id), onMouseLeave: () => setHovered((h) => (h === id ? null : h)), onClick: () => onSelect(id), className: "cursor-pointer", fill: fillFor(id), fillOpacity: opacityFor(id), stroke: isSelected ? '#ffffff' : isHovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.28)', strokeWidth: isSelected ? 1.6 : isHovered ? 1.1 : isInset ? 0.8 : 0.5, strokeLinejoin: "round", style: {
                transition: 'fill 320ms ease, fill-opacity 320ms ease, stroke 220ms ease, stroke-width 220ms ease',
                filter: isSelected
                    ? 'drop-shadow(0 0 16px rgba(246, 196, 111,0.65))'
                    : isHovered
                        ? 'drop-shadow(0 0 10px rgba(255,255,255,0.35))'
                        : undefined,
            } }, id));
    });
    const hoverStory = hovered ? STATE_BY_ID[hovered] : null;
    const [pointer, setPointer] = useState(null);
    const trackPointer = (e) => {
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect)
            return;
        setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs("svg", { ref: svgRef, viewBox: `0 0 ${MAIN_W} ${MAIN_H}`, className: "w-full select-none touch-none", onWheel: onWheel, onPointerDown: onPointerDown, onPointerMove: (e) => {
                    trackPointer(e);
                    onPointerMove(e);
                }, onPointerUp: onPointerUp, onPointerLeave: onPointerUp, role: "img", "aria-label": "Interactive map of India", children: [_jsxs("defs", { children: [_jsxs("radialGradient", { id: "globe", cx: "50%", cy: "42%", r: "62%", children: [_jsx("stop", { offset: "0%", stopColor: "rgba(129,140,248,0.30)" }), _jsx("stop", { offset: "55%", stopColor: "rgba(99,102,241,0.12)" }), _jsx("stop", { offset: "100%", stopColor: "rgba(99,102,241,0)" })] }), _jsxs("radialGradient", { id: "globeInner", cx: "50%", cy: "50%", r: "50%", children: [_jsx("stop", { offset: "0%", stopColor: "rgba(246, 196, 111,0.10)" }), _jsx("stop", { offset: "100%", stopColor: "rgba(246, 196, 111,0)" })] }), _jsx("filter", { id: "soft", x: "-30%", y: "-30%", width: "160%", height: "160%", children: _jsx("feGaussianBlur", { stdDeviation: "7" }) })] }), _jsx("ellipse", { cx: MAIN_W / 2, cy: MAIN_H * 0.46, rx: MAIN_W * 0.46, ry: MAIN_H * 0.44, fill: "url(#globe)", filter: "url(#soft)" }), _jsx("ellipse", { cx: MAIN_W / 2, cy: MAIN_H * 0.46, rx: MAIN_W * 0.36, ry: MAIN_H * 0.35, fill: "url(#globeInner)" }), _jsxs("g", { transform: `translate(${transform.x} ${transform.y}) scale(${transform.scale})`, children: [renderFeatures(mainFeatures, mainPath, false), islandProjections.map(({ inset, path, projection }) => {
                                const feature = islandFeatures.find((f) => f.properties.id === inset.id);
                                if (!feature || !path || !projection)
                                    return null;
                                return (_jsxs("g", { children: [_jsx("rect", { x: inset.box.x, y: inset.box.y, width: inset.box.w, height: inset.box.h, rx: 16, fill: "rgba(255,255,255,0.035)", stroke: "rgba(255,255,255,0.16)", strokeDasharray: "4 5" }), _jsx("text", { x: inset.box.x + 10, y: inset.box.y + 16, fill: "rgba(255,255,255,0.45)", fontSize: "10", letterSpacing: "1.4", children: inset.label }), _jsx("g", { transform: `translate(${inset.box.x} ${inset.box.y + 18})`, children: renderFeatures([feature], path, true) })] }, inset.id));
                            })] })] }), hoverStory && pointer ? (_jsxs("div", { className: "pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-xl border border-parchment-200/20 bg-ink-900/90 px-3 py-1.5 text-xs font-medium text-parchment-100 shadow-glass backdrop-blur-md", style: { left: pointer.x, top: pointer.y }, children: [hoverStory.name, _jsx("span", { className: "ml-2 text-[12px] tracking-wider text-parchment-200/50", children: hoverStory.region })] })) : null, _jsx("div", { className: "pointer-events-none absolute right-3 top-3 flex flex-col gap-2", children: _jsxs("div", { className: "pointer-events-auto flex flex-col overflow-hidden rounded-xl border border-parchment-200/20 bg-ink-900/70 backdrop-blur-md", children: [_jsx("button", { onClick: () => setTransform((t) => clamp({ ...t, scale: t.scale * 1.35 })), className: "grid h-9 w-9 place-items-center text-parchment-200/70 transition-colors hover:bg-white/10 hover:text-parchment-100", "aria-label": "Zoom in", children: "+" }), _jsx("div", { className: "h-px bg-white/10" }), _jsx("button", { onClick: () => setTransform((t) => clamp({ ...t, scale: t.scale / 1.35 })), className: "grid h-9 w-9 place-items-center text-parchment-200/70 transition-colors hover:bg-white/10 hover:text-parchment-100", "aria-label": "Zoom out", children: "\u2212" }), _jsx("div", { className: "h-px bg-white/10" }), _jsx("button", { onClick: reset, className: "grid h-9 w-9 place-items-center text-parchment-200/70 transition-colors hover:bg-white/10 hover:text-parchment-100", "aria-label": "Reset view", children: _jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M3 12a9 9 0 1 0 3-6.7L3 8", strokeLinecap: "round" }), _jsx("path", { d: "M3 3v5h5", strokeLinecap: "round" })] }) })] }) }), transform.scale > 1.01 && (_jsx("button", { onClick: reset, className: "absolute bottom-3 right-3 rounded-full border border-parchment-200/20 bg-ink-900/80 px-3 py-1.5 text-[12px] text-parchment-200/60 backdrop-blur-md transition-colors hover:text-parchment-100", children: "Reset view" }))] }));
}
