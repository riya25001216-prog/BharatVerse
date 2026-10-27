import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Minimal renderer for the small markdown dialect used by the guide:
 * `**bold**`, `*italic*`, `•` bullets, `###` headings and simple pipe tables.
 */
export function renderMarkdown(text) {
    const lines = text.split('\n');
    const blocks = [];
    let list = [];
    let table = [];
    const flushList = (key) => {
        if (list.length) {
            blocks.push(_jsx("ul", { className: "my-1.5 space-y-1.5", children: list }, key));
            list = [];
        }
    };
    const flushTable = (key) => {
        if (table.length) {
            const [head, ...rows] = table;
            blocks.push(_jsx("div", { className: "my-2 overflow-hidden rounded-xl border border-white/10", children: _jsxs("table", { className: "w-full border-collapse text-left text-[11.5px]", children: [_jsx("thead", { children: _jsx("tr", { className: "bg-white/[0.06]", children: head.map((cell, i) => (_jsx("th", { className: "px-2.5 py-1.5 font-semibold text-white/85", children: inline(cell) }, i))) }) }), _jsx("tbody", { children: rows.map((row, r) => (_jsx("tr", { className: "border-t border-white/8", children: row.map((cell, c) => (_jsx("td", { className: "px-2.5 py-1.5 align-top text-white/65", children: inline(cell) }, c))) }, r))) })] }) }, key));
            table = [];
        }
    };
    lines.forEach((raw, index) => {
        const line = raw.trimEnd();
        if (line.trim().startsWith('|')) {
            const cells = line
                .trim()
                .split('|')
                .slice(1, -1)
                .map((c) => c.trim());
            if (cells.every((c) => /^-{2,}$/.test(c)))
                return;
            table.push(cells);
            return;
        }
        flushTable(`t${index}`);
        if (!line.trim()) {
            flushList(`l${index}`);
            return;
        }
        if (line.startsWith('### ')) {
            flushList(`l${index}`);
            blocks.push(_jsx("div", { className: "mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-saffron-300/80", children: line.slice(4) }, `h${index}`));
            return;
        }
        if (line.startsWith('• ')) {
            list.push(_jsxs("li", { className: "flex gap-2 text-[13px] leading-relaxed text-white/78", children: [_jsx("span", { className: "mt-[7px] h-1 w-1 shrink-0 rounded-full bg-saffron-300/70" }), _jsx("span", { children: inline(line.slice(2)) })] }, `li${index}`));
            return;
        }
        if (/^\d+\.\s/.test(line)) {
            const num = line.match(/^(\d+)\.\s/)?.[1];
            list.push(_jsxs("li", { className: "flex gap-2 text-[13px] leading-relaxed text-white/78", children: [_jsxs("span", { className: "mt-0.5 shrink-0 font-semibold text-saffron-300/80", children: [num, "."] }), _jsx("span", { children: inline(line.replace(/^\d+\.\s/, '')) })] }, `li${index}`));
            return;
        }
        flushList(`l${index}`);
        blocks.push(_jsx("p", { className: "my-1 text-[13px] leading-relaxed text-white/78", children: inline(line) }, `p${index}`));
    });
    flushList('l-end');
    flushTable('t-end');
    return _jsx(_Fragment, { children: blocks });
}
function inline(text) {
    const parts = [];
    const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let last = 0;
    let match;
    let key = 0;
    while ((match = pattern.exec(text)) !== null) {
        if (match.index > last)
            parts.push(text.slice(last, match.index));
        const token = match[0];
        if (token.startsWith('**')) {
            parts.push(_jsx("strong", { className: "font-semibold text-white", children: token.slice(2, -2) }, key++));
        }
        else {
            parts.push(_jsx("em", { className: "italic text-white/85", children: token.slice(1, -1) }, key++));
        }
        last = match.index + token.length;
    }
    if (last < text.length)
        parts.push(text.slice(last));
    return parts;
}
