import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../lib/i18n';
export function LanguageSelector({ compact = false }) {
    const { language, setLanguage, langInfo } = useLanguage();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handleOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);
    return (_jsxs("div", { className: "relative inline-block text-left", ref: ref, children: [_jsxs("button", { type: "button", onClick: () => setOpen(!open), className: "inline-flex items-center gap-2 rounded-full border border-parchment-200/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-parchment-100 backdrop-blur-md transition-all hover:border-saffron-400/40 hover:bg-white/[0.08]", "aria-label": "Select language", children: [_jsx(Globe, { size: 14, className: "text-saffron-400" }), _jsx("span", { children: compact ? langInfo.code.toUpperCase() : langInfo.nativeName })] }), open && (_jsxs("div", { className: "absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-2xl border border-white/10 bg-ink-950/95 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150", children: [_jsx("div", { className: "px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-parchment-200/50", children: "Select Language" }), _jsx("div", { className: "max-h-60 overflow-y-auto no-scrollbar space-y-0.5", children: SUPPORTED_LANGUAGES.map((lang) => {
                            const active = lang.code === language;
                            return (_jsxs("button", { type: "button", onClick: () => {
                                    setLanguage(lang.code);
                                    setOpen(false);
                                }, className: `flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${active
                                    ? 'bg-saffron-400/15 text-saffron-300 font-medium'
                                    : 'text-parchment-200/75 hover:bg-white/5 hover:text-parchment-100'}`, children: [_jsxs("div", { className: "flex flex-col text-left", children: [_jsx("span", { children: lang.nativeName }), _jsx("span", { className: "text-[10px] text-parchment-200/40", children: lang.name })] }), active && _jsx(Check, { size: 14, className: "text-saffron-400" })] }, lang.code));
                        }) })] }))] }));
}
