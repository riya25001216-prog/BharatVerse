import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { StatePage } from './pages/StatePage';
import { PanoramaPage } from './pages/PanoramaPage';
import { PanoramasPage } from './pages/PanoramasPage';
import { GuidePage } from './pages/GuidePage';
import { StoriesPage } from './pages/StoriesPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { PlanPage } from './pages/PlanPage';
import { RidgeHeroPage } from './pages/RidgeHeroPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LanguageProvider } from './lib/i18n';

// Hash router ensures 100% reliable deep-linking on GitHub Pages without server-side routing
const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        errorElement: <NotFoundPage />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/explore', element: <ExplorePage /> },
          { path: '/destinations', element: <DestinationsPage /> },
          { path: '/panoramas', element: <PanoramasPage /> },
          { path: '/panorama', element: <PanoramasPage /> },
          { path: '/360', element: <PanoramasPage /> },
          { path: '/state/:id', element: <StatePage /> },
          { path: '/panorama/:slug', element: <PanoramaPage /> },
          { path: '/guide', element: <GuidePage /> },
          { path: '/stories', element: <StoriesPage /> },
          { path: '/plan', element: <PlanPage /> },
          { path: '/ridge-ai', element: <RidgeHeroPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
