import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_AUTH_BACKEND_URL}/api/verify-token`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const response = await res.json();
        console.log('res', response)
        if (response.valid) {
            dispatch(setUser(response.user))
            setIsAuthenticated(true);
        }
        else setIsAuthenticated(false);
      } catch {
        setIsAuthenticated(false);
      }
    };

    if (token) verifyToken();
    else setIsAuthenticated(false);
  }, [token]);

  if (isAuthenticated === null) return <div className="text-center mt-10">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;
