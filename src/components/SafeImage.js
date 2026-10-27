import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { assetUrl } from '../lib/assets';
import { Sparkles } from 'lucide-react';
export function SafeImage({ src, alt = '', className = '', fallbackText, fallbackCategory, loading, ...props }) {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);
    // Normalize src using assetUrl
    const resolvedSrc = src ? assetUrl(src) : '';
    useEffect(() => {
        setHasError(false);
        if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
            setIsLoaded(true);
        }
    }, [resolvedSrc]);
    if (!resolvedSrc || hasError) {
        return (_jsxs("div", { className: `relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-ink-900 via-ink-950 to-saffron-950/40 p-6 text-center border border-white/10 ${className}`, role: "img", "aria-label": alt || fallbackText || 'Image placeholder', children: [_jsx("div", { className: "absolute inset-0 opacity-15 bg-[radial-gradient(#F2A93B_1px,transparent_1px)] [background-size:16px_16px]" }), _jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [_jsx("div", { className: "mb-2 grid h-10 w-10 place-items-center rounded-full bg-saffron-400/10 text-saffron-400 border border-saffron-400/20", children: _jsx(Sparkles, { size: 18 }) }), fallbackCategory && (_jsx("span", { className: "text-[10px] uppercase tracking-widest text-saffron-400 font-medium", children: fallbackCategory })), _jsx("span", { className: "mt-1 font-display text-sm font-light text-parchment-100 line-clamp-2", children: fallbackText || alt || 'BharatVerse Discovery' })] })] }));
    }
    return (_jsxs("div", { className: `relative overflow-hidden ${className}`, children: [!isLoaded && (_jsx("div", { className: "absolute inset-0 animate-pulse bg-white/[0.05]" })), _jsx("img", { ref: imgRef, src: resolvedSrc, alt: alt, loading: loading || 'eager', onLoad: () => setIsLoaded(true), onError: () => setHasError(true), className: `h-full w-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-90'}`, ...props })] }));
}
