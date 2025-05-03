import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {
    const isAdmin = useAuthStore((state) => state.isAdmin);
    return isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
