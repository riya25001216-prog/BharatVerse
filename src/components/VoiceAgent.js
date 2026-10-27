import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from 'react';
import { ConversationProvider, useConversation } from '@elevenlabs/react';
import { Eye, Mic, MicOff, PhoneOff } from 'lucide-react';
import { getLiveView, subscribeLiveView } from '../lib/liveView';
import { ELEVENLABS_AGENT_ID } from '../lib/voice';
let lineId = 0;
// Survives the panel closing, so an old request isn't replayed when it reopens.
let handledExplainNonce = 0;
function micErrorText(err) {
    const name = err?.name;
    if (name === 'NotAllowedError' || name === 'SecurityError')
        return 'Microphone access is blocked. Allow the microphone for this site in your browser, then try again.';
    if (name === 'NotFoundError')
        return 'No microphone was found. Connect one, then try again.';
    return 'Your microphone couldn’t be opened. Check it isn’t in use by another app, then try again.';
}
/**
 * Live voice conversation with the ElevenLabs "Tara" agent (@elevenlabs/react v1).
 * The orb swells with whoever is speaking, so it's obvious when to talk.
 */
export function VoiceAgent({ active, explainNonce = 0 }) {
    return (_jsx(ConversationProvider, { agentId: ELEVENLABS_AGENT_ID, connectionType: "webrtc", children: _jsx(VoiceSession, { active: active, explainNonce: explainNonce }) }));
}
function VoiceSession({ active, explainNonce }) {
    const [lines, setLines] = useState([]);
    const [error, setError] = useState(null);
    const [muted, setMuted] = useState(false);
    const orbRef = useRef(null);
    const scrollRef = useRef(null);
    const conversation = useConversation({
        micMuted: muted,
        onMessage: (msg) => {
            const text = msg.message?.trim();
            if (!text)
                return;
            setLines((l) => [...l, { id: lineId++, who: msg.role === 'user' ? 'you' : 'tara', text }]);
        },
        onError: () => setError('The connection to Tara dropped. Start the conversation again.'),
    });
    const { status, isSpeaking, startSession, endSession, getInputVolume, getOutputVolume, sendContextualUpdate, sendUserMessage, sendMultimodalMessage, uploadFile, } = conversation;
    const live = status === 'connected';
    const connecting = status === 'connecting';
    const pendingExplain = useRef(false);
    const [looking, setLooking] = useState(false);
    /** Tells Tara, silently, what is on the visitor's screen right now. */
    const shareView = useCallback(() => {
        sendContextualUpdate(`[Live view] ${getLiveView().description} If the visitor asks what they are looking at, or to explain it, use this.`);
    }, [sendContextualUpdate]);
    /** Sends a snapshot of the current view (when there is one) and asks Tara to explain it. */
    const explain = useCallback(async () => {
        const view = getLiveView();
        const prompt = `Please explain what I am looking at right now. ${view.description}`;
        setLooking(true);
        try {
            const blob = view.capture ? await view.capture() : null;
            if (blob) {
                const { fileId } = await uploadFile(blob);
                sendMultimodalMessage({
                    text: `${prompt} The attached image is exactly what is on my screen; describe what you can see in it and tell me its story.`,
                    fileIds: [fileId],
                });
            }
            else {
                sendUserMessage(prompt);
            }
        }
        catch {
            sendUserMessage(prompt);
        }
        finally {
            setLooking(false);
        }
    }, [uploadFile, sendMultimodalMessage, sendUserMessage]);
    // Once connected: share the current view, and run a queued "explain" request.
    useEffect(() => {
        if (!live)
            return;
        shareView();
        if (pendingExplain.current) {
            pendingExplain.current = false;
            const t = setTimeout(() => void explain(), 900);
            return () => clearTimeout(t);
        }
    }, [live, shareView, explain]);
    // Keep Tara updated as the visitor moves around (debounced).
    useEffect(() => {
        if (!live)
            return;
        let t;
        const unsub = subscribeLiveView(() => {
            clearTimeout(t);
            t = setTimeout(shareView, 1200);
        });
        return () => {
            clearTimeout(t);
            unsub();
        };
    }, [live, shareView]);
    const start = useCallback(async () => {
        setError(null);
        try {
            // Ask for the microphone first so a refusal gets a clear, specific message.
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach((t) => t.stop());
        }
        catch (err) {
            setError(micErrorText(err));
            return;
        }
        setLines([]);
        setMuted(false);
        startSession();
    }, [startSession]);
    const stop = useCallback(() => {
        endSession();
    }, [endSession]);
    // "Explain this view" buttons elsewhere on the site.
    useEffect(() => {
        if (!explainNonce || explainNonce === handledExplainNonce)
            return;
        handledExplainNonce = explainNonce;
        if (live)
            void explain();
        else {
            pendingExplain.current = true;
            if (!connecting)
                void start();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [explainNonce]);
    useEffect(() => {
        if (status === 'error')
            setError('Tara couldn’t connect. Check your internet connection and try again.');
    }, [status]);
    // Hang up when the panel closes or the user switches to typing.
    useEffect(() => {
        if (!active && (live || connecting))
            endSession();
    }, [active, live, connecting, endSession]);
    // Drive the orb from live audio levels without re-rendering React.
    useEffect(() => {
        const el = orbRef.current;
        if (!live || !el) {
            el?.style.setProperty('--level', '0');
            return;
        }
        let raf = 0;
        const tick = () => {
            const level = Math.min(1, Math.max(getOutputVolume(), getInputVolume()) * 1.6);
            el.style.setProperty('--level', level.toFixed(3));
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [live, getInputVolume, getOutputVolume]);
    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [lines]);
    const statusText = connecting
        ? 'Connecting…'
        : live
            ? isSpeaking
                ? 'Tara is speaking'
                : muted
                    ? 'Your microphone is muted'
                    : 'Listening. Go ahead and speak.'
            : 'Talk with Tara';
    return (_jsxs("div", { className: "flex min-h-0 flex-1 flex-col", children: [_jsxs("div", { className: "flex flex-col items-center px-6 pb-5 pt-7 text-center", children: [_jsxs("div", { ref: orbRef, className: "voice-orb", "data-live": live ? 'true' : 'false', "data-speaking": isSpeaking && live ? 'true' : 'false', "aria-hidden": "true", children: [_jsx("span", { className: "voice-orb__halo" }), _jsx("span", { className: "voice-orb__core" })] }), _jsx("p", { className: "mt-5 font-display text-xl text-parchment-100", "aria-live": "polite", children: statusText }), !live && !connecting ? (_jsx("p", { className: "mt-2 max-w-[17rem] text-[13px] leading-relaxed text-parchment-200/60", children: "Ask about any state, festival or dish. Tara can also see what\u2019s on your screen and explain it." })) : null, _jsx("div", { className: "mt-5 flex items-center gap-3", children: live || connecting ? (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", onClick: () => setMuted((m) => !m), disabled: !live, className: "grid h-12 w-12 place-items-center rounded-full border border-parchment-200/25 text-parchment-100 transition-colors hover:bg-white/10 disabled:opacity-40", "aria-label": muted ? 'Unmute microphone' : 'Mute microphone', "aria-pressed": muted, children: muted ? _jsx(MicOff, { size: 18 }) : _jsx(Mic, { size: 18 }) }), _jsxs("button", { type: "button", onClick: () => void explain(), disabled: !live || looking, className: "inline-flex h-12 items-center gap-2 rounded-full border border-saffron-400/60 px-4 text-sm font-semibold text-saffron-300 transition-colors hover:bg-saffron-400/10 disabled:opacity-40", children: [_jsx(Eye, { size: 17 }), looking ? 'Looking…' : 'Explain view'] }), _jsxs("button", { type: "button", onClick: stop, className: "inline-flex h-12 items-center gap-2 rounded-full bg-sindoor-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-sindoor-400", children: [_jsx(PhoneOff, { size: 17 }), "End"] })] })) : (_jsxs("button", { type: "button", onClick: () => void start(), className: "btn-primary !h-12 !px-7", children: [_jsx(Mic, { size: 17 }), "Start talking"] })) }), error ? (_jsx("p", { role: "alert", className: "mt-4 max-w-[19rem] rounded-2xl border border-sindoor-400/40 bg-sindoor-500/10 px-4 py-3 text-[13px] leading-relaxed text-parchment-100", children: error })) : null] }), _jsx("div", { ref: scrollRef, className: "min-h-0 flex-1 space-y-3 overflow-y-auto border-t border-parchment-200/10 px-4 py-4", children: lines.length === 0 ? (_jsx("p", { className: "text-center text-[13px] text-parchment-200/45", children: "What you and Tara say appears here." })) : (lines.map((l) => (_jsx("div", { className: l.who === 'you' ? 'flex justify-end' : 'flex', children: _jsx("p", { className: `max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${l.who === 'you'
                            ? 'rounded-br-md bg-saffron-400 text-ink-950'
                            : 'rounded-tl-md border border-parchment-200/10 bg-white/[0.04] text-parchment-100'}`, children: l.text }) }, l.id)))) })] }));
}
