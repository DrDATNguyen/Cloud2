// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    // Nếu người dùng không được xác thực, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
