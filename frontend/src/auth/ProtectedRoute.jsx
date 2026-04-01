import { Navigate } from 'react-router';
import { useAuth } from './AuthProvider';

function ProtectedRoute({ children }) {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;
