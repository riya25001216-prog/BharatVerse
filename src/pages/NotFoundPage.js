import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
export function NotFoundPage() {
    const error = useRouteError();
    const isCrash = error != null && !(isRouteErrorResponse(error) && error.status === 404);
    return (_jsxs("section", { className: "mx-auto flex min-h-[80vh] max-w-2xl flex-col items-start justify-center px-6 pt-24", children: [_jsx("p", { className: "font-display text-7xl font-light italic text-saffron-400", children: isCrash ? 'Oops' : '404' }), _jsx("h1", { className: "mt-4 font-display text-4xl font-normal text-parchment-100", children: isCrash ? 'This page hit a snag.' : 'This road isn’t on the map.' }), _jsx("p", { className: "mt-3 max-w-md text-parchment-200/60", children: isCrash
                    ? 'Something went wrong while loading it. Head back home and try again.'
                    : 'The page you followed doesn’t exist. Start from the atlas or pick a destination.' }), _jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [_jsx(Link, { to: "/explore", className: "btn-primary", children: "Open the atlas" }), _jsx(Link, { to: "/", className: "btn-ghost", children: "Go home" })] })] }));
}
