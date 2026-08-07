import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useStore from '../store/useStore';

/**
 * Route guard that redirects unauthenticated users to the login page.
 * Preserves the intended destination in the URL so we can redirect back after login.
 */
export default function ProtectedRoute({ children }) {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
    }

    return children;
}
