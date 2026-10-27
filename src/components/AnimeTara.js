import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
const SIZE_MAP = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-28 h-28',
    xl: 'w-44 h-44',
};
export function AnimeTara({ state = 'idle', size = 'md', className = '', showBadge = false, onClick, }) {
    const isSpeaking = state === 'speaking';
    const isListening = state === 'listening';
    const isThinking = state === 'thinking';
    const isError = state === 'error';
    return (_jsxs("div", { onClick: onClick, className: `relative inline-block select-none ${SIZE_MAP[size]} ${className} ${onClick ? 'cursor-pointer' : ''}`, role: "img", "aria-label": `Tara, your cultural virtual guide (${state})`, children: [_jsx(motion.div, { className: "absolute inset-0 rounded-full", animate: {
                    boxShadow: isSpeaking
                        ? [
                            '0 0 15px rgba(242, 169, 59, 0.4), inset 0 0 10px rgba(242, 169, 59, 0.2)',
                            '0 0 28px rgba(242, 169, 59, 0.75), inset 0 0 15px rgba(242, 169, 59, 0.4)',
                            '0 0 15px rgba(242, 169, 59, 0.4), inset 0 0 10px rgba(242, 169, 59, 0.2)',
                        ]
                        : isListening
                            ? [
                                '0 0 15px rgba(56, 189, 248, 0.4)',
                                '0 0 28px rgba(56, 189, 248, 0.8)',
                                '0 0 15px rgba(56, 189, 248, 0.4)',
                            ]
                            : isThinking
                                ? [
                                    '0 0 15px rgba(168, 85, 247, 0.4)',
                                    '0 0 25px rgba(168, 85, 247, 0.7)',
                                    '0 0 15px rgba(168, 85, 247, 0.4)',
                                ]
                                : isError
                                    ? '0 0 20px rgba(239, 68, 68, 0.6)'
                                    : '0 0 12px rgba(242, 169, 59, 0.25)',
                }, transition: {
                    repeat: Infinity,
                    duration: isSpeaking ? 1.2 : isListening ? 1.4 : 2.5,
                    ease: 'easeInOut',
                } }), _jsxs("svg", { viewBox: "0 0 200 200", className: "relative z-10 w-full h-full drop-shadow-md overflow-visible", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "taraHairGrad", x1: "100", y1: "20", x2: "100", y2: "180", gradientUnits: "userSpaceOnUse", children: [_jsx("stop", { offset: "0%", stopColor: "#1a0f2e" }), _jsx("stop", { offset: "60%", stopColor: "#2c1a4d" }), _jsx("stop", { offset: "100%", stopColor: "#120924" })] }), _jsxs("linearGradient", { id: "taraSkinGrad", x1: "100", y1: "50", x2: "100", y2: "150", gradientUnits: "userSpaceOnUse", children: [_jsx("stop", { offset: "0%", stopColor: "#FFEBD8" }), _jsx("stop", { offset: "65%", stopColor: "#F9D7B7" }), _jsx("stop", { offset: "100%", stopColor: "#E8BE96" })] }), _jsxs("linearGradient", { id: "taraEyeGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#4A2511" }), _jsx("stop", { offset: "45%", stopColor: "#B45309" }), _jsx("stop", { offset: "100%", stopColor: "#F59E0B" })] }), _jsxs("linearGradient", { id: "taraAttireGrad", x1: "40", y1: "150", x2: "160", y2: "200", gradientUnits: "userSpaceOnUse", children: [_jsx("stop", { offset: "0%", stopColor: "#F59E0B" }), _jsx("stop", { offset: "50%", stopColor: "#EA580C" }), _jsx("stop", { offset: "100%", stopColor: "#B91C1C" })] })] }), _jsx("path", { d: "M 52 90 C 45 120, 48 165, 62 190 C 66 170, 70 145, 68 115 Z", fill: "url(#taraHairGrad)" }), _jsx("path", { d: "M 148 90 C 155 120, 152 165, 138 190 C 134 170, 130 145, 132 115 Z", fill: "url(#taraHairGrad)" }), _jsx("path", { d: "M 88 128 L 112 128 L 116 155 L 84 155 Z", fill: "#E8BE96" }), _jsx("path", { d: "M 88 128 C 96 134, 104 134, 112 128 L 114 136 C 104 140, 96 140, 86 136 Z", fill: "#D9A980", opacity: "0.6" }), _jsx("path", { d: "M 64 160 C 85 178, 115 178, 136 160 C 148 174, 158 194, 162 205 L 38 205 C 42 194, 52 174, 64 160 Z", fill: "url(#taraAttireGrad)" }), _jsx("path", { d: "M 64 160 C 85 178, 115 178, 136 160", stroke: "#FDE047", strokeWidth: "3.5", strokeLinecap: "round" }), _jsx("circle", { cx: "100", cy: "172", r: "3.5", fill: "#FEF08A" }), _jsx("path", { d: "M 58 84 C 56 112, 70 142, 100 148 C 130 142, 144 112, 142 84 C 140 60, 132 45, 100 45 C 68 45, 60 60, 58 84 Z", fill: "url(#taraSkinGrad)" }), _jsx("ellipse", { cx: "74", cy: "108", rx: "8", ry: "4.5", fill: "#F43F5E", opacity: "0.25" }), _jsx("ellipse", { cx: "126", cy: "108", rx: "8", ry: "4.5", fill: "#F43F5E", opacity: "0.25" }), _jsx("circle", { cx: "100", cy: "79", r: "2.8", fill: "#DC2626" }), _jsx("circle", { cx: "100", cy: "77.8", r: "0.9", fill: "#FDE047" }), _jsxs("g", { id: "left-eye", children: [_jsx(motion.path, { d: isError
                                    ? 'M 67 76 C 74 79, 82 78, 86 82'
                                    : isThinking
                                        ? 'M 67 74 C 74 72, 82 73, 86 76'
                                        : 'M 67 77 C 74 74, 82 74, 86 78', stroke: "#2B1547", strokeWidth: "2.2", strokeLinecap: "round" }), _jsx("path", { d: "M 66 89 C 71 82, 82 82, 88 89", stroke: "#1E1033", strokeWidth: "2.8", strokeLinecap: "round" }), _jsx("path", { d: "M 87 88 L 90 85", stroke: "#1E1033", strokeWidth: "2", strokeLinecap: "round" }), _jsx("ellipse", { cx: "77", cy: "94", rx: "6.5", ry: "8", fill: "url(#taraEyeGrad)" }), _jsx("ellipse", { cx: "77", cy: "94", rx: "3.5", ry: "4.5", fill: "#120822" }), _jsx("circle", { cx: "75", cy: "91", r: "2.2", fill: "#FFFFFF" }), _jsx("circle", { cx: "79.5", cy: "97", r: "1.2", fill: "#FFFFFF", opacity: "0.8" })] }), _jsxs("g", { id: "right-eye", children: [_jsx(motion.path, { d: isError
                                    ? 'M 133 76 C 126 79, 118 78, 114 82'
                                    : isThinking
                                        ? 'M 133 73 C 126 71, 118 72, 114 75'
                                        : 'M 133 77 C 126 74, 118 74, 114 78', stroke: "#2B1547", strokeWidth: "2.2", strokeLinecap: "round" }), _jsx("path", { d: "M 134 89 C 129 82, 118 82, 112 89", stroke: "#1E1033", strokeWidth: "2.8", strokeLinecap: "round" }), _jsx("path", { d: "M 113 88 L 110 85", stroke: "#1E1033", strokeWidth: "2", strokeLinecap: "round" }), _jsx("ellipse", { cx: "123", cy: "94", rx: "6.5", ry: "8", fill: "url(#taraEyeGrad)" }), _jsx("ellipse", { cx: "123", cy: "94", rx: "3.5", ry: "4.5", fill: "#120822" }), _jsx("circle", { cx: "121", cy: "91", r: "2.2", fill: "#FFFFFF" }), _jsx("circle", { cx: "125.5", cy: "97", r: "1.2", fill: "#FFFFFF", opacity: "0.8" })] }), _jsx("path", { d: "M 98 107 C 100 108, 102 108, 103 107", stroke: "#C88E67", strokeWidth: "1.6", strokeLinecap: "round" }), isSpeaking ? (_jsx(motion.path, { d: "M 92 122 Q 100 132 108 122 Q 100 120 92 122 Z", fill: "#E11D48", stroke: "#9F1239", strokeWidth: "1.2", animate: {
                            d: [
                                'M 93 122 Q 100 125 107 122 Q 100 123 93 122 Z',
                                'M 91 121 Q 100 135 109 121 Q 100 119 91 121 Z',
                                'M 93 122 Q 100 127 107 122 Q 100 123 93 122 Z',
                            ],
                        }, transition: {
                            repeat: Infinity,
                            duration: 0.35,
                            ease: 'easeInOut',
                        } })) : isError ? (_jsx("path", { d: "M 94 125 Q 100 121 106 125", stroke: "#9F1239", strokeWidth: "2", strokeLinecap: "round", fill: "none" })) : isThinking ? (_jsx("path", { d: "M 95 123 Q 100 125 105 122", stroke: "#9F1239", strokeWidth: "2", strokeLinecap: "round", fill: "none" })) : (
                    /* Gentle Smile */
                    _jsx("path", { d: "M 93 121 Q 100 127 107 121", stroke: "#9F1239", strokeWidth: "2", strokeLinecap: "round", fill: "none" })), _jsx("path", { d: "M 56 75 C 65 48, 85 40, 100 40 C 122 40, 142 50, 146 76 C 138 65, 122 62, 108 66 C 96 70, 92 78, 82 72 C 72 66, 62 67, 56 75 Z", fill: "url(#taraHairGrad)" }), _jsx("path", { d: "M 58 75 C 55 96, 58 118, 64 126 C 62 112, 63 94, 66 82 Z", fill: "url(#taraHairGrad)" }), _jsx("path", { d: "M 144 75 C 147 96, 144 118, 138 126 C 140 112, 139 94, 136 82 Z", fill: "url(#taraHairGrad)" }), _jsxs("g", { transform: "translate(136, 55)", children: [_jsx("circle", { cx: "0", cy: "0", r: "6", fill: "#F59E0B" }), _jsx("circle", { cx: "-5", cy: "-2", r: "4.5", fill: "#FDE047" }), _jsx("circle", { cx: "4", cy: "-4", r: "4.5", fill: "#FDE047" }), _jsx("circle", { cx: "5", cy: "3", r: "4.5", fill: "#FDE047" }), _jsx("circle", { cx: "-3", cy: "5", r: "4.5", fill: "#FDE047" }), _jsx("circle", { cx: "0", cy: "0", r: "3", fill: "#D97706" })] }), _jsxs("g", { transform: "translate(56, 112)", children: [_jsx("circle", { cx: "0", cy: "0", r: "2.2", fill: "#FDE047" }), _jsx("path", { d: "M -3 3 L 3 3 L 4 7 L -4 7 Z", fill: "#F59E0B" }), _jsx("circle", { cx: "0", cy: "9", r: "1.2", fill: "#FDE047" })] }), _jsxs("g", { transform: "translate(144, 112)", children: [_jsx("circle", { cx: "0", cy: "0", r: "2.2", fill: "#FDE047" }), _jsx("path", { d: "M -3 3 L 3 3 L 4 7 L -4 7 Z", fill: "#F59E0B" }), _jsx("circle", { cx: "0", cy: "9", r: "1.2", fill: "#FDE047" })] }), isListening && (_jsxs("g", { transform: "translate(155, 30)", children: [_jsx("circle", { cx: "10", cy: "10", r: "14", fill: "#0284C7" }), _jsx("path", { d: "M 10 5 C 8.5 5 7.5 6 7.5 7.5 L 7.5 11 C 7.5 12.5 8.5 13.5 10 13.5 C 11.5 13.5 12.5 12.5 12.5 11 L 12.5 7.5 C 12.5 6 11.5 5 10 5 Z", fill: "#FFFFFF" }), _jsx("path", { d: "M 5.5 10 C 5.5 12.5 7.5 14.5 10 14.5 C 12.5 14.5 14.5 12.5 14.5 10", stroke: "#FFFFFF", strokeWidth: "1.5", strokeLinecap: "round", fill: "none" }), _jsx("path", { d: "M 10 14.5 L 10 17 M 7.5 17 L 12.5 17", stroke: "#FFFFFF", strokeWidth: "1.5", strokeLinecap: "round" })] })), isThinking && (_jsx("g", { transform: "translate(150, 20)", children: _jsx(motion.g, { animate: { rotate: 360 }, transition: { repeat: Infinity, duration: 3, ease: 'linear' }, children: _jsx("polygon", { points: "12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9", fill: "#A855F7" }) }) })), isSpeaking && (_jsxs("g", { transform: "translate(155, 30)", children: [_jsx(motion.circle, { cx: "10", cy: "10", r: "12", fill: "#EA580C", animate: { scale: [0.9, 1.2, 0.9] }, transition: { repeat: Infinity, duration: 1 } }), _jsx("path", { d: "M 8 7 L 8 13 M 11 5 L 11 15 M 14 8 L 14 12", stroke: "#FFFFFF", strokeWidth: "1.8", strokeLinecap: "round" })] }))] }), showBadge && (_jsx("span", { className: `absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${isSpeaking
                    ? 'border-saffron-400/80 bg-saffron-500/90 text-ink-950 animate-pulse'
                    : isListening
                        ? 'border-sky-400/80 bg-sky-500/90 text-ink-950'
                        : isThinking
                            ? 'border-purple-400/80 bg-purple-500/90 text-ink-950'
                            : isError
                                ? 'border-red-400/80 bg-red-500/90 text-white'
                                : 'border-parchment-200/30 bg-ink-950/80 text-parchment-100'}`, children: state }))] }));
}
