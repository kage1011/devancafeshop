import React from 'react';

import { useAuth } from '../context/AuthContext';

import AuthNavigator from './AuthNavigator';
import AdminNavigator from './AdminNavigator'; // admin
import CustomerNavigator from './CustomerNavigator'; // khách hàng
import SplashScreen from '../screens//Splash/SplashScreen'; //splash loading

const RootNavigator = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  console.log('RootNavigator - user:', user, 'isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);
  if (isLoading) {
    return <SplashScreen />;
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
