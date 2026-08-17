import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminHomeScreen from '../screens/Admin/AdminHomeScreen';
// import ProductScreen from '../screens/admin/ProductScreen';
// import CategoryScreen from '../screens/admin/CategoryScreen';
// import TableScreen from '../screens/admin/TableScreen';
// import OrderScreen from '../screens/admin/OrderScreen';
// import UserScreen from '../screens/admin/UserScreen';
// import BannerScreen from '../screens/admin/BannerScreen';

export type AdminStackParamList = {
  AdminHome: undefined;

  Products: undefined;

  Categories: undefined;

  Tables: undefined;

  Orders: undefined;

  Users: undefined;

  Banners: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminHome"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{
          title: 'Admin Dashboard',
        }}
      />

      {/* <Stack.Screen
        name="Products"
        component={ProductScreen}
        options={{
          title: 'Quản lý sản phẩm',
        }}
      /> */}

      {/* <Stack.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          title: 'Quản lý Category',
        }}
      />

      <Stack.Screen
        name="Tables"
        component={TableScreen}
        options={{
          title: 'Quản lý bàn',
        }}
      />

      <Stack.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          title: 'Quản lý đơn hàng',
        }}
      />

      <Stack.Screen
        name="Users"
        component={UserScreen}
        options={{
          title: 'Quản lý User',
        }}
      />

      <Stack.Screen
        name="Banners"
        component={BannerScreen}
        options={{
          title: 'Quản lý Banner',
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AdminNavigator;
