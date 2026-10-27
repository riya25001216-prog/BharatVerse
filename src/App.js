import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { StatePage } from './pages/StatePage';
import { PanoramaPage } from './pages/PanoramaPage';
import { GuidePage } from './pages/GuidePage';
import { StoriesPage } from './pages/StoriesPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { PlanPage } from './pages/PlanPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LanguageProvider } from './lib/i18n';
// Created once at module level so the router isn't rebuilt on every render.
const router = createBrowserRouter([
    {
        element: _jsx(Layout, {}),
        children: [
            {
                // Errors inside a page render here, keeping the navbar and footer around them.
                errorElement: _jsx(NotFoundPage, {}),
                children: [
                    { path: '/', element: _jsx(HomePage, {}) },
                    { path: '/explore', element: _jsx(ExplorePage, {}) },
                    { path: '/destinations', element: _jsx(DestinationsPage, {}) },
                    { path: '/state/:id', element: _jsx(StatePage, {}) },
                    { path: '/panorama/:slug', element: _jsx(PanoramaPage, {}) },
                    { path: '/guide', element: _jsx(GuidePage, {}) },
                    { path: '/stories', element: _jsx(StoriesPage, {}) },
                    { path: '/plan', element: _jsx(PlanPage, {}) },
                    { path: '*', element: _jsx(NotFoundPage, {}) },
                ],
            },
        ],
    },
], {
    basename: import.meta.env.BASE_URL,
});
export default function App() {
    return (_jsx(LanguageProvider, { children: _jsx(RouterProvider, { router: router }) }));
}
