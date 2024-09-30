import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token'); // Kiểm tra trạng thái đăng nhập

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
