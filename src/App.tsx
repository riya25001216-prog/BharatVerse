import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { StatePage } from './pages/StatePage';
import { PanoramaPage } from './pages/PanoramaPage';
import { GuidePage } from './pages/GuidePage';
import { StoriesPage } from './pages/StoriesPage';

export default function AppRouter() {
  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/explore', element: <ExplorePage /> },
    { path: '/state/:id', element: <StatePage /> },
    { path: '/panorama/:slug', element: <PanoramaPage /> },
    { path: '/guide', element: <GuidePage /> },
    { path: '/stories', element: <StoriesPage /> },
  ]);

  return (
    <RouterProvider router={router} />
  );
}