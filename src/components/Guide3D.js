import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { India3D } from './India3D';
import { JOURNEYS } from '../data/journeys';
import { panoramaForStop } from '../data/panoramas';
import { STATE_BY_ID } from '../data/states';
import { SafeImage } from './SafeImage';
import { imagePath } from '../lib/assets';
const AUTOPLAY_MS = 8000;
export function Guide3D({ onOpenPanorama }) {
    const [journeyIndex, setJourneyIndex] = useState(0);
    const [stopIndex, setStopIndex] = useState(0);
    const [playing, setPlaying] = useState(true);
    const journey = JOURNEYS[journeyIndex];
    const stop = journey.stops[stopIndex];
    const panorama = panoramaForStop(journey.id, stopIndex);
    const state = STATE_BY_ID[stop.stateId];
    const route = useMemo(() => {
        const ids = [];
        for (const s of journey.stops) {
            if (!ids.includes(s.stateId))
                ids.push(s.stateId);
        }
        return ids;
    }, [journey]);
    useEffect(() => {
        if (!playing)
            return;
        const timer = window.setTimeout(() => {
            setStopIndex((i) => (i + 1) % journey.stops.length);
        }, AUTOPLAY_MS);
        return () => window.clearTimeout(timer);
    }, [playing, stopIndex, journey.stops.length]);
    useEffect(() => {
        setStopIndex(0);
    }, [journeyIndex]);
    const go = (dir) => {
        setStopIndex((i) => (i + dir + journey.stops.length) % journey.stops.length);
    };
    return (_jsxs("div", { className: "grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]", children: [_jsx("div", { className: "glass relative overflow-hidden rounded-[30px] p-2 sm:p-3", children: _jsxs("div", { className: "relative h-[480px] w-full overflow-hidden rounded-[24px] sm:h-[600px]", children: [_jsx(India3D, { className: "h-full w-full", route: route, selectedId: stop.stateId, focusId: stop.stateId, fov: 38, elevation: 48 }), _jsxs("div", { className: "pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-[12px] text-saffron-300/90", children: journey.subtitle }), _jsx("div", { className: "mt-1 font-display text-xl font-light text-parchment-100 sm:text-2xl", children: journey.name })] }), _jsxs("div", { className: "rounded-full border border-parchment-200/20 bg-ink-950/60 px-3 py-1.5 text-[12px] text-parchment-200/75 backdrop-blur-md", children: ["Stop ", stopIndex + 1, " / ", journey.stops.length] })] }), _jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" }), _jsxs("div", { className: "absolute inset-x-0 bottom-0 flex items-center gap-3 p-4", children: [_jsx("button", { onClick: () => go(-1), className: "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-parchment-200/20 bg-ink-950/60 text-parchment-200/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-parchment-100", "aria-label": "Previous stop", children: _jsx("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M19 12H6M11 18l-6-6 6-6", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsx("button", { onClick: () => setPlaying((p) => !p), className: "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-parchment-200/20 bg-ink-950/60 text-parchment-200/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-parchment-100", "aria-label": playing ? 'Pause' : 'Play', children: playing ? (_jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "currentColor", children: [_jsx("rect", { x: "6", y: "5", width: "4", height: "14", rx: "1" }), _jsx("rect", { x: "14", y: "5", width: "4", height: "14", rx: "1" })] })) : (_jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("path", { d: "M8 5.5v13l11-6.5-11-6.5Z" }) })) }), _jsx("button", { onClick: () => go(1), className: "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-parchment-200/20 bg-ink-950/60 text-parchment-200/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-parchment-100", "aria-label": "Next stop", children: _jsx("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M5 12h13M13 6l6 6-6 6", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsx("div", { className: "flex flex-1 gap-1.5", children: journey.stops.map((s, i) => (_jsx("button", { onClick: () => setStopIndex(i), className: "relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/15", "aria-label": s.title, children: i < stopIndex ? (_jsx("span", { className: "absolute inset-0 bg-saffron-300/80" })) : i === stopIndex ? (_jsx(motion.span, { className: "absolute inset-y-0 left-0 bg-saffron-300", initial: { width: '0%' }, animate: { width: playing ? '100%' : '32%' }, transition: { duration: playing ? AUTOPLAY_MS / 1000 : 0.4, ease: 'linear' } }, `${journeyIndex}-${stopIndex}-${playing}`)) : null }, s.title))) })] })] }) }), _jsxs("div", { className: "glass flex flex-col gap-4 rounded-[30px] p-5 sm:p-6", children: [_jsx("div", { className: "flex flex-wrap gap-1.5", children: JOURNEYS.map((j, i) => (_jsx("button", { onClick: () => setJourneyIndex(i), className: `chip border transition-all ${journeyIndex === i
                                ? 'border-transparent bg-saffron-300 text-ink-950'
                                : 'border-parchment-200/10 bg-white/[0.03] text-parchment-200/55 hover:border-white/25 hover:text-parchment-100'}`, children: j.name }, j.id))) }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 18, filter: 'blur(8px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, exit: { opacity: 0, y: -12, filter: 'blur(6px)' }, transition: { duration: 0.45 }, children: [_jsxs("div", { className: "relative overflow-hidden rounded-2xl", children: [_jsx(SafeImage, { src: imagePath(stop.image), alt: stop.title, className: "h-44 w-full object-cover", loading: "lazy" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" }), _jsxs("div", { className: "absolute inset-x-0 bottom-0 p-4", children: [_jsx("div", { className: "text-[12px] text-saffron-300/85", children: stop.place }), _jsx("h3", { className: "mt-1 font-display text-2xl font-light text-parchment-100", children: stop.title })] })] }), _jsx("p", { className: "mt-4 text-[13.5px] leading-relaxed text-parchment-200/70", children: stop.description }), _jsxs("div", { className: "mt-3 flex items-center gap-2 text-[11.5px] text-parchment-200/50", children: [_jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [_jsx("path", { d: "M11 5 6 9H3v6h3l5 4V5Z", strokeLinejoin: "round" }), _jsx("path", { d: "M15.5 8.5a5 5 0 0 1 0 7", strokeLinecap: "round" })] }), stop.sound] }), _jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [panorama ? (_jsx("button", { onClick: () => onOpenPanorama(panorama.slug), className: "sheen inline-flex items-center gap-2 rounded-full bg-saffron-400 hover:bg-saffron-300 px-4 py-2.5 text-[12.5px] font-semibold text-ink-950", children: "Enter the 360\u00B0 scene \u2197" })) : (_jsx("span", { className: "rounded-full border border-parchment-200/10 px-4 py-2.5 text-[12px] text-parchment-200/50", children: "360\u00B0 capture in progress" })), state ? (_jsxs("span", { className: "rounded-full border border-parchment-200/10 px-4 py-2.5 text-[12px] text-parchment-200/60", children: [state.name, " \u00B7 ", state.bestMonths] })) : null] })] }, `${journey.id}-${stopIndex}`) }), _jsx("div", { className: "divider-glow" }), _jsx("div", { className: "grid grid-cols-2 gap-2.5", children: [
                            { k: 'Duration', v: journey.duration },
                            { k: 'Distance', v: journey.distance },
                            { k: 'Budget', v: journey.budget },
                            { k: 'Best time', v: journey.bestTime },
                        ].map((f) => (_jsxs("div", { className: "rounded-2xl border border-parchment-200/10 bg-white/[0.03] px-3.5 py-3", children: [_jsx("div", { className: "text-[12px] text-parchment-200/50", children: f.k }), _jsx("div", { className: "mt-1 text-[12.5px] leading-snug text-parchment-100", children: f.v })] }, f.k))) }), _jsxs("div", { children: [_jsxs("div", { className: "mb-3 flex items-center gap-3", children: [_jsx("span", { className: "text-[12px] text-parchment-200/50", children: "The plan" }), _jsx("span", { className: "h-px flex-1 bg-white/10" })] }), _jsx("ol", { className: "relative max-h-64 space-y-3.5 overflow-y-auto border-l border-parchment-200/10 pl-5 pr-1", children: journey.plan.map((p) => (_jsxs("li", { className: "relative", children: [_jsx("span", { className: "absolute -left-[26px] top-1.5 h-2 w-2 rounded-full bg-saffron-300/80 ring-4 ring-ink-950" }), _jsx("div", { className: "text-[12px] text-saffron-300/70", children: p.day }), _jsx("div", { className: "mt-0.5 text-[13px] font-medium text-parchment-100", children: p.title }), _jsx("div", { className: "mt-0.5 text-[12px] leading-relaxed text-parchment-200/50", children: p.detail })] }, p.day))) })] })] })] }));
}
