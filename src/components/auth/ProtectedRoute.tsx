import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openSignInModal } from '../../store/uiSlice';
import type { RootState } from '../../store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  signedIn?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, signedIn }) => {
  const { access } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  // If the route requires signing in and we don't have a user/token
  if (signedIn && !access) {
    // Instead of navigating to a standalone page, we trigger the login modal
    dispatch(openSignInModal());
    // We stay on the current page (or home) but indicate we are waiting for auth
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
