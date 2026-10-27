import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';
import { narrator } from '../lib/narrator';
import { AnimeTara } from './AnimeTara';
export function FloatingAudioPlayer() {
    const [state, setState] = useState(narrator.getState());
    useEffect(() => {
        return narrator.subscribe(setState);
    }, []);
    if (!state.isPlaying && !state.isPaused) {
        return null;
    }
    return (_jsxs("aside", { "aria-label": "Floating audio narration player", className: "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3.5 rounded-full border border-saffron-400/50 bg-ink-950/90 px-4 py-2.5 shadow-[0_10px_35px_rgba(242,169,59,0.3)] backdrop-blur-xl animate-fade-in transition-all", children: [_jsxs("div", { className: "relative shrink-0", children: [_jsx(AnimeTara, { size: "sm", state: state.isPlaying ? 'speaking' : 'idle' }), state.isPlaying && (_jsx("span", { className: "absolute -bottom-0.5 -right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-saffron-400 text-ink-950", children: _jsx(Volume2, { size: 9, className: "animate-pulse" }) }))] }), _jsxs("div", { className: "max-w-[200px] sm:max-w-xs truncate text-xs text-parchment-100", children: [_jsx("span", { className: "font-semibold text-saffron-300", children: "Tara: " }), _jsx("span", { className: "italic", children: state.currentText || 'Cultural Narration…' })] }), _jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [state.isPaused ? (_jsx("button", { type: "button", onClick: () => narrator.resume(), className: "grid h-7 w-7 place-items-center rounded-full bg-saffron-400 text-ink-950 hover:bg-saffron-300 transition-colors", "aria-label": "Resume narration", children: _jsx(Play, { size: 12, className: "fill-current" }) })) : (_jsx("button", { type: "button", onClick: () => narrator.pause(), className: "grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 text-parchment-100 hover:bg-white/20 transition-colors", "aria-label": "Pause narration", children: _jsx(Pause, { size: 12 }) })), _jsx("button", { type: "button", onClick: () => narrator.stop(), className: "grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 text-parchment-200/80 hover:bg-rose-500/20 hover:text-rose-300 transition-colors", "aria-label": "Stop narration", children: _jsx(Square, { size: 10, className: "fill-current" }) })] })] }));
}
