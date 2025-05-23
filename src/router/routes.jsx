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
import Login from '../pages/admin/Login';
import ReportDetail from '../pages/admin/ReportDetail';
import Reports from '../pages/admin/Reports';
import Admins from '../pages/admin/Admins';
import AdminDetail from '../pages/admin/AdminDetail';
import AdminAdd from '../pages/admin/AdminAdd';
import Settings from '../pages/admin/Settings';

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
      { path: '/login', element: <Login /> },
    ],
  },
  {
    path: '/admin-panel',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/admin-panel/reports', element: <Reports /> },
      { path: '/admin-panel/reports/:id', element: <ReportDetail /> },
      { path: '/admin-panel/admins', element: <Admins /> },
      { path: '/admin-panel/admins/:id', element: <AdminDetail /> },
      { path: '/admin-panel/admins/add', element: <AdminAdd /> },
      { path: '/admin-panel/settings', element: <Settings /> },
    ],
  },
]);

export default router;
