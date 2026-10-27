import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Play, Pause, Square, Volume2, AlertCircle } from 'lucide-react';
import { narrator } from '../lib/narrator';
import { AnimeTara } from './AnimeTara';
import { useLanguage } from '../lib/i18n';
export function AudioNarrationBar({ textToNarrate, title, className = '' }) {
    const { language, t } = useLanguage();
    const [narrState, setNarrState] = useState(narrator.getState());
    useEffect(() => {
        return narrator.subscribe(setNarrState);
    }, []);
    const handlePlay = () => {
        narrator.play(textToNarrate, language);
    };
    const handlePause = () => {
        narrator.pause();
    };
    const handleResume = () => {
        narrator.resume();
    };
    const handleStop = () => {
        narrator.stop();
    };
    const isNarratingCurrentText = narrState.isPlaying || narrState.isPaused;
    return (_jsxs("div", { className: `glass rounded-2xl border border-parchment-200/15 p-4 transition-all duration-300 ${isNarratingCurrentText ? 'ring-1 ring-saffron-400/50 shadow-[0_8px_30px_rgba(242,169,59,0.15)]' : ''} ${className}`, children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(AnimeTara, { size: "sm", state: narrState.isPlaying ? 'speaking' : narrState.isPaused ? 'idle' : 'idle' }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-[13px] font-semibold text-parchment-100", children: [title ? `${title} · ` : '', t('guideNarration')] }), narrState.isPlaying && (_jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-saffron-400/20 px-2 py-0.5 text-[11px] font-medium text-saffron-300", children: [_jsx(Volume2, { size: 12, className: "animate-pulse" }), t('speaking')] })), narrState.isPaused && (_jsx("span", { className: "rounded-full bg-parchment-200/10 px-2 py-0.5 text-[11px] text-parchment-200/60", children: t('paused') }))] }), _jsx("p", { className: "text-[11.5px] text-parchment-200/55", children: t('audioListenPrompt') })] })] }), _jsx("div", { className: "flex items-center gap-2", children: !narrState.isPlaying && !narrState.isPaused ? (_jsxs("button", { type: "button", onClick: handlePlay, className: "inline-flex items-center gap-2 rounded-full bg-saffron-400 hover:bg-saffron-300 px-4 py-2 text-[12.5px] font-semibold text-ink-950 transition-colors shadow-md", "aria-label": t('playAudio'), children: [_jsx(Play, { size: 14, className: "fill-current" }), _jsx("span", { children: t('playAudio') })] })) : (_jsxs(_Fragment, { children: [narrState.isPaused ? (_jsxs("button", { type: "button", onClick: handleResume, className: "inline-flex items-center gap-1.5 rounded-full bg-saffron-400 hover:bg-saffron-300 px-3.5 py-1.5 text-[12px] font-semibold text-ink-950 transition-colors", "aria-label": t('resumeAudio'), children: [_jsx(Play, { size: 13, className: "fill-current" }), _jsx("span", { children: t('resumeAudio') })] })) : (_jsxs("button", { type: "button", onClick: handlePause, className: "inline-flex items-center gap-1.5 rounded-full border border-parchment-200/20 bg-ink-950/60 hover:bg-white/10 px-3.5 py-1.5 text-[12px] font-medium text-parchment-100 transition-colors", "aria-label": t('pauseAudio'), children: [_jsx(Pause, { size: 13 }), _jsx("span", { children: t('pauseAudio') })] })), _jsxs("button", { type: "button", onClick: handleStop, className: "inline-flex items-center gap-1.5 rounded-full border border-parchment-200/20 bg-ink-950/60 hover:bg-rose-500/20 hover:border-rose-400/40 px-3 py-1.5 text-[12px] text-parchment-200/70 hover:text-rose-300 transition-colors", "aria-label": t('stopAudio'), children: [_jsx(Square, { size: 12, className: "fill-current" }), _jsx("span", { children: t('stopAudio') })] })] })) })] }), isNarratingCurrentText && narrState.currentText && (_jsxs("div", { className: "mt-3 rounded-xl border border-saffron-400/30 bg-ink-950/60 p-3 backdrop-blur-md", children: [_jsx("p", { className: "text-[13px] leading-relaxed text-parchment-100 font-sans", children: _jsxs("span", { className: "rounded bg-saffron-400/30 px-1.5 py-0.5 text-saffron-200 font-medium shadow-sm", children: ["\"", narrState.currentText, "\""] }) }), _jsxs("div", { className: "mt-2 flex items-center justify-between text-[11px] text-parchment-200/45", children: [_jsxs("span", { children: ["Sentence ", narrState.currentSentenceIndex + 1, " of ", narrState.totalSentences] }), _jsx("span", { children: "Tara narrating" })] })] })), narrState.error && (_jsxs("div", { className: "mt-2 flex items-center gap-2 text-[12px] text-amber-300/80", children: [_jsx(AlertCircle, { size: 14, className: "shrink-0" }), _jsx("span", { children: narrState.error })] }))] }));
}
