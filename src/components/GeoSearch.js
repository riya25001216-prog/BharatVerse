import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { locate, parseCoordinates, capitalCoords, haversineKm } from '../lib/geo';
import { STATE_BY_ID } from '../data/states';
export function GeoSearch({ onOpenState }) {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('idle');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const runCoordinateSearch = (lat, lng) => {
        const hit = locate(lat, lng);
        if (!hit)
            return;
        const [capLat, capLng] = capitalCoords(hit.id);
        const toCapital = haversineKm(lat, lng, capLat, capLng);
        setResult({
            kind: hit.inside ? 'exact' : 'nearest',
            id: hit.id,
            name: hit.name,
            title: hit.inside ? `You are inside ${hit.name}` : `Nearest state: ${hit.name}`,
            detail: hit.inside
                ? `${lat.toFixed(4)}°, ${lng.toFixed(4)}° falls within ${hit.name} · ${toCapital.toFixed(0)} km to ${hit.capital}.`
                : `${lat.toFixed(4)}°, ${lng.toFixed(4)}° is outside the country — the closest state is ${hit.name}, ${hit.distanceKm.toFixed(0)} km away.`,
            lat,
            lng,
        });
        setStatus('idle');
    };
    const submit = (e) => {
        e.preventDefault();
        setError('');
        const coords = parseCoordinates(query);
        if (coords) {
            runCoordinateSearch(coords.lat, coords.lng);
            return;
        }
        const q = query.trim().toLowerCase();
        if (!q)
            return;
        const story = Object.values(STATE_BY_ID).find((s) => s.name.toLowerCase().includes(q) ||
            s.capital.toLowerCase().includes(q) ||
            s.languages.some((l) => l.toLowerCase().includes(q)) ||
            s.landmarks.some((l) => l.name.toLowerCase().includes(q)));
        if (story) {
            const [capLat, capLng] = capitalCoords(story.id);
            setResult({
                kind: 'state',
                id: story.id,
                name: story.name,
                title: story.name,
                detail: `${story.tagline} · capital ${story.capital} (${capLat.toFixed(2)}°, ${capLng.toFixed(2)}°)`,
                lat: capLat,
                lng: capLng,
            });
            return;
        }
        setError(`Nothing matched “${query}”. Try a state name, or coordinates like 12.9716, 77.5946.`);
    };
    const useMyLocation = () => {
        if (!('geolocation' in navigator)) {
            setError('This browser does not expose a location API.');
            return;
        }
        setStatus('locating');
        setError('');
        navigator.geolocation.getCurrentPosition((pos) => {
            runCoordinateSearch(pos.coords.latitude, pos.coords.longitude);
        }, (err) => {
            setStatus('error');
            setError(err.code === err.PERMISSION_DENIED
                ? 'Location permission denied — you can type coordinates instead.'
                : 'Could not read your position. Type coordinates instead.');
        }, { enableHighAccuracy: true, timeout: 12000 });
    };
    return (_jsxs("div", { className: "glass rounded-3xl p-4 sm:p-5", children: [_jsxs("form", { onSubmit: submit, className: "flex flex-col gap-3 sm:flex-row", children: [_jsxs("div", { className: "relative flex-1", children: [_jsxs("svg", { className: "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-parchment-200/50", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "11", cy: "11", r: "7" }), _jsx("path", { d: "m20 20-3.2-3.2", strokeLinecap: "round" })] }), _jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "State name, or exact coordinates \u2014 12.9716, 77.5946", className: "w-full rounded-2xl border border-parchment-200/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-parchment-100 placeholder-parchment-200/40 outline-none transition-colors focus:border-saffron-300/45 focus:bg-white/[0.06]", "aria-label": "Search by name or exact coordinates" })] }), _jsxs("button", { type: "button", onClick: useMyLocation, className: "inline-flex items-center justify-center gap-2 rounded-2xl border border-parchment-200/20 px-4 py-3 text-[13px] font-medium text-parchment-200/80 transition-colors hover:border-white/35 hover:text-parchment-100", children: [_jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [_jsx("circle", { cx: "12", cy: "12", r: "3" }), _jsx("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3", strokeLinecap: "round" }), _jsx("circle", { cx: "12", cy: "12", r: "8" })] }), status === 'locating' ? 'Locating…' : 'Use my location'] }), _jsx("button", { type: "submit", className: "sheen rounded-2xl bg-saffron-400 hover:bg-saffron-300 px-6 py-3 text-[13px] font-semibold text-ink-950", children: "Locate" })] }), _jsx(AnimatePresence, { children: error ? (_jsx(motion.p, { initial: { opacity: 0, y: -6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, className: "mt-3 text-[12.5px] text-lotus-300", children: error })) : null }), _jsx(AnimatePresence, { children: result ? (_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, className: "mt-4 flex flex-col gap-3 rounded-2xl border border-saffron-300/25 bg-saffron-400/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "rounded-full bg-saffron-300 px-2 py-0.5 text-[12px] font-bold text-ink-950", children: result.kind === 'exact'
                                                ? 'Exact location'
                                                : result.kind === 'nearest'
                                                    ? 'Nearest'
                                                    : 'Match' }), _jsx("span", { className: "text-[14px] font-semibold text-parchment-100", children: result.title })] }), _jsx("p", { className: "mt-1 text-[12.5px] leading-relaxed text-parchment-200/65", children: result.detail })] }), _jsxs("button", { onClick: () => onOpenState(result.id), className: "shrink-0 rounded-full bg-white/95 px-4 py-2 text-[12.5px] font-semibold text-ink-950 transition-transform hover:scale-[1.03]", children: ["Open ", result.name, " \u2197"] })] })) : null })] }));
}
