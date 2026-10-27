import { jsx as _jsx } from "react/jsx-runtime";
import { Stories } from '../components/Stories';
import { useAsk } from '../lib/ask';
export function StoriesPage() {
    const ask = useAsk();
    return (_jsx("div", { className: "pt-20", children: _jsx(Stories, { onAsk: ask }) }));
}
