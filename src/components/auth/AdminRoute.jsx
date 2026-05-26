import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ProtectedRoute } from './ProtectedRoute';

export const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcf9f8] flex items-center justify-center">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] px-6 py-4 font-bold text-[#455859]">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      {isAdmin ? children : <Navigate to="/" replace />}
    </ProtectedRoute>
  );
};
