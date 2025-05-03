import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Dashboard from '../pages/admin/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Features from '../pages/public/Features';
import Contact from '../pages/public/Contact';
import LiveMap from '../pages/public/LiveMap';
import Report from '../pages/public/Report';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/features', element: <Features /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/map', element: <LiveMap /> },
      { path: '/report', element: <Report /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
]);

export default router;
