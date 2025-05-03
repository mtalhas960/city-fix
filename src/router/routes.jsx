import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Dashboard from '../pages/admin/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/features', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Home /> },
      { path: '/map', element: <Home /> },
      { path: '/report', element: <Home /> },
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
