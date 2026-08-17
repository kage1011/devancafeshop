import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/HomeScreen';
import OrderScreen from '../screens/Order/OrderScreen';
// import CartScreen from '../screens/customer/CartScreen';
// import ProfileScreen from '../screens/customer/ProfileScreen';

export type CustomerStackParamList = {
  Home: undefined;

  Order: undefined;

  Cart: undefined;

  Profile: undefined;
};

const Stack =
  createNativeStackNavigator<CustomerStackParamList>();

const CustomerNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Cafe',
        }}
      />

      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={{
          title: 'Order',
        }}
      />

      {/* <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Giỏ hàng',
        }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Tài khoản',
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default CustomerNavigator;