import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from './Atmosphere';
import { SafeImage } from './SafeImage';
import { imagePath } from '../lib/assets';
const DISCOVERIES = [
    {
        id: 'attire',
        category: 'Traditional Attire',
        title: 'Silk, cotton and the language of cloth',
        image: 'gujarat',
        blurb: 'From Kanjeevaram silks to Phulkari embroidery, Indian dress is geometry, memory and weather folded into cloth.',
        details: [
            'Kanjeevaram silks from Kanchipuram are woven on handlooms with temple-inspired motifs, while Gujarati Bandhani tie-dye turns a single sari into a pattern of dots.',
            'Punjabi Phulkari embroidery carries geometric stories across the dupatta, and the Himalayan phol is woven from local sheep wool.',
            'Traditional attire is still worn daily, not as costume: the five-yard drape of the south, the shawl of the north, the lungi of the coast.',
        ],
        guideQuestion: 'Tell me about the traditional attire of Gujarat',
    },
    {
        id: 'food',
        category: 'Famous Food',
        title: 'The thali as a universe',
        image: 'kerala',
        blurb: 'A thali is not a meal, it is a map of a region: rice, bread, five fats, five pickles, one story of spice.',
        details: [
            'The Kerala sadhya pairs rice with avial, thoran, payasam and papadum; the Gujarati thali is the classic sweet-spicy-sour balance; the Rajasthani thali carries dal baati churma.',
            'Every region argues about the correct number of items on the thali, and every argument is delicious.',
            'Street food is the thali of the cities: pani puri, dosa, kathi rolls, momos and pav bhaji.',
        ],
        guideQuestion: 'Food in Kerala',
    },
    {
        id: 'craft',
        category: 'Art and Craft',
        title: 'Hands that kept the old knowledge',
        image: 'andhra-pradesh',
        blurb: 'Kalamkari, Pichwadi, Talaweka and the thousand village crafts that survive only because someone kept weaving.',
        details: [
            'Kalamkari from Srikakulam paints temple cloth with natural dyes and stories from the Ramayana.',
            'Pichwadi in Andhra is hand-woven on narrow looms into geometric temple walls.',
            'Bidriware and Dhokra metal craft turn clay and lost-wax into ritual objects.',
        ],
        guideQuestion: 'Craft of Andhra Pradesh',
    },
    {
        id: 'festivals',
        category: 'Traditions and Festivals',
        title: 'Festivals as weather systems',
        image: 'west-bengal',
        blurb: 'Durga Puja, Onam, Diwali, Hornbill: festival calendars that move the weather, the markets and the hearts of millions.',
        details: [
            'Durga Puja in Bengal turns whole neighbourhoods into temporary temples of clay, light and sound.',
            'Onam in Kerala is a harvest festival of flower carpets, boats and the twenty-course sadya.',
            'Hornbill in Nagaland is a ten-day state festival of dance, masks and heritage.',
        ],
        guideQuestion: 'Festivals in Assam',
    },
    {
        id: 'hidden',
        category: 'Hidden Place',
        title: 'Rani ki Vav, the stepwell that is a universe underground',
        image: 'gujarat',
        blurb: 'A seventh-century stepwell carved downward into the earth, where five storeys of steps meet the water.',
        details: [
            'Rani ki Vav in Patan is a UNESCO World Heritage Site and a inverted temple built for the queen who never used it.',
            'The stepwells were engineering, not decoration: they stored monsoon water for a thirsty city.',
            'The hidden places of India are usually the ones with no ticket queue: village temples, island beaches, desert salt flats.',
        ],
        guideQuestion: 'Tell me about the hidden places of Gujarat',
    },
];
export function CulturalDiscoveries({ onHear }) {
    const [openId, setOpenId] = useState(null);
    const open = DISCOVERIES.find((d) => d.id === openId) ?? null;
    return (_jsxs("section", { id: "discoveries", className: "relative scroll-mt-24 py-24 sm:py-32", children: [_jsxs("div", { className: "mx-auto max-w-7xl px-5 sm:px-8", children: [_jsx(SectionHeading, { kicker: "Five doors", title: "Five ways India", highlight: "keeps its soul", description: "Traditional attire, food, craft, festivals and the hidden places that rarely make the postcards but carry the deepest history." }), _jsx("div", { className: "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: DISCOVERIES.map((d, i) => (_jsxs(motion.button, { initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.6, delay: Math.min(i * 0.08, 0.35) }, onClick: () => setOpenId(d.id), className: "glass card-hover group relative h-full overflow-hidden rounded-[26px] text-left", children: [_jsxs("div", { className: "relative h-52 overflow-hidden", children: [_jsx(SafeImage, { src: imagePath(d.image), alt: d.category, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" }), _jsx("div", { className: "absolute inset-x-0 top-0 p-4", children: _jsx("span", { className: "rounded-full border border-parchment-200/20 bg-ink-950/55 px-2.5 py-1 text-[12px] text-parchment-200/75 backdrop-blur-md", children: d.category }) })] }), _jsxs("div", { className: "p-5", children: [_jsx("h3", { className: "font-display text-xl font-light leading-snug text-parchment-100", children: d.title }), _jsx("p", { className: "mt-2.5 text-[13px] leading-relaxed text-parchment-200/55", children: d.blurb })] })] }, d.id))) })] }), _jsx(AnimatePresence, { children: open ? (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setOpenId(null), className: "fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/85 p-4 backdrop-blur-md", children: _jsxs(motion.article, { initial: { opacity: 0, y: 40, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 24, scale: 0.98 }, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }, onClick: (e) => e.stopPropagation(), className: "glass max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[30px]", children: [_jsxs("div", { className: "relative h-56", children: [_jsx(SafeImage, { src: imagePath(open.image), alt: open.category, className: "h-full w-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" }), _jsx("button", { onClick: () => setOpenId(null), className: "absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-parchment-200/20 bg-ink-950/60 text-parchment-200/80 backdrop-blur-md transition-colors hover:text-parchment-100", "aria-label": "Close", children: _jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M6 6l12 12M18 6 6 18", strokeLinecap: "round" }) }) }), _jsxs("div", { className: "absolute inset-x-0 bottom-0 p-6", children: [_jsx("div", { className: "text-[12px] text-saffron-300/85", children: open.category }), _jsx("h2", { className: "mt-2 font-display text-3xl font-light leading-tight text-parchment-100", children: open.title })] })] }), _jsxs("div", { className: "p-6 sm:p-8", children: [_jsx("p", { className: "text-[15px] italic leading-relaxed text-parchment-200/70", children: open.blurb }), _jsx("div", { className: "divider-glow my-6" }), _jsx("div", { className: "space-y-3", children: open.details.map((d) => (_jsx("p", { className: "text-[14px] leading-relaxed text-parchment-200/70", children: d }, d))) }), _jsx("div", { className: "mt-8 flex flex-wrap gap-2.5", children: _jsx("button", { onClick: () => {
                                                setOpenId(null);
                                                onHear(open.guideQuestion);
                                            }, className: "sheen rounded-full bg-saffron-400 hover:bg-saffron-300 px-5 py-2.5 text-[13px] font-semibold text-ink-950 transition-transform hover:scale-[1.03]", children: "Hear it from the guide" }) })] })] }) })) : null })] }));
}
