import React from 'react';

import { useAuth } from '../context/AuthContext';

import AuthNavigator from './AuthNavigator';
import AdminNavigator from './AdminNavigator'; // admin
import CustomerNavigator from './CustomerNavigator'; // khách hàng

const RootNavigator = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) { // nếu chưa có đăng nhập --> phải đăng nhập
    return <AuthNavigator />;
  }

  if (user?.role === 'ADMIN') { // nếu role admin thì chuyển sang AdminNavigator
    return <AdminNavigator />;
  }

  return <CustomerNavigator />;
};

export default RootNavigator;
