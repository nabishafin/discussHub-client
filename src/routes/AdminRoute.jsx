import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import useAdmin from '@/hooks/useAdmin';
import { AuthContext } from '@/provider/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin()


    // Show loading spinner while authentication status is being determined
    if (loading || isAdminLoading) return <LoadingSpinner />;

    // If the user is authenticated, render the children components
    if (user || isAdmin) return children;

    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" ></Navigate>
};

export default AdminRoute;