import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser, logoutUser } from './redux/slices/authSlice';
import AppRoutes from './routes/AppRoutes';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [token, user, dispatch]);

  useEffect(() => {
    const handleUnauthorized = () => {
      dispatch(logoutUser());
      if (!window.location.pathname.includes('/login')) {
        navigate('/login', { replace: true });
      }
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [navigate, dispatch]);

  return <AppRoutes />;
}

export default App;

