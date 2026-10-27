import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Chatbot } from './Chatbot';
import { FloatingAudioPlayer } from './FloatingAudioPlayer';
import { Aurora } from './Atmosphere';
import { GuideContext } from '../lib/ask';
import { setLiveView } from '../lib/liveView';
const PAGE_NAMES = {
    '/': 'the BharatVerse home page, with the 3D map of India, 360° scenes and featured stories',
    '/explore': 'the interactive 3D atlas of India, where every state can be clicked',
    '/destinations': 'the list of all 36 states and union territories',
    '/stories': 'the stories page about people, animals and places across India',
    '/guide': 'the 3D virtual guide that follows travel routes across India',
    '/plan': 'the trip planner',
};
export function Layout() {
    const [chatOpen, setChatOpen] = useState(false);
    const [seed, setSeed] = useState(null);
    const [voiceNonce, setVoiceNonce] = useState(0);
    const [explainNonce, setExplainNonce] = useState(0);
    const { pathname } = useLocation();
    // Default live view for pages that don't describe themselves in more detail.
    useEffect(() => {
        const name = PAGE_NAMES[pathname];
        if (name)
            setLiveView({ description: `The visitor is looking at ${name}.` });
    }, [pathname]);
    const ask = useCallback((question) => {
        setChatOpen(true);
        setSeed({ text: question, nonce: Date.now() });
    }, []);
    const openVoice = useCallback(() => {
        setChatOpen(true);
        setVoiceNonce(Date.now());
    }, []);
    const explainView = useCallback(() => {
        setChatOpen(true);
        const now = Date.now();
        setVoiceNonce(now);
        setExplainNonce(now);
    }, []);
    const controls = useMemo(() => ({ ask, openVoice, explainView }), [ask, openVoice, explainView]);
    return (_jsxs(GuideContext.Provider, { value: controls, children: [_jsx(Aurora, {}), _jsx("div", { className: "grain", "aria-hidden": "true" }), _jsx("a", { href: "#main", className: "sr-only z-[200] rounded-full bg-saffron-400 px-4 py-2 text-sm font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4", children: "Skip to content" }), _jsx(Navbar, {}), _jsx("main", { id: "main", className: "relative min-h-screen", children: _jsx(Outlet, {}) }), _jsx(Footer, {}), _jsx(FloatingAudioPlayer, {}), _jsx(Chatbot, { seed: seed, voiceNonce: voiceNonce, explainNonce: explainNonce, open: chatOpen, onOpenChange: setChatOpen }), _jsx(ScrollRestoration, {})] }));
}
