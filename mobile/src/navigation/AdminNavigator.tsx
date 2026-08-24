import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminHomeScreen from '../screens/Admin/AdminHomeScreen';
import AdminProductScreen from '../screens/Admin/ProductScreen';
import AdminCategoryScreen from '../screens/Admin/CategoryScreen';
// import TableScreen from '../screens/admin/TableScreen';
// import OrderScreen from '../screens/admin/OrderScreen';
// import UserScreen from '../screens/admin/UserScreen';
// import BannerScreen from '../screens/admin/BannerScreen';
import { AdminStackParamList } from '../root/RootStackParamList';

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

      <Stack.Screen
        name="AdminProduct"
        component={AdminProductScreen}
        options={{
          title: 'Quản lý sản phẩm',
        }}
      />
      <Stack.Screen
        name="AdminCategories"
        component={AdminCategoryScreen}
        options={{
          title: 'Quản lý nhóm sản phẩm',
        }}
      />

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
