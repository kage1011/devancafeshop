import React from "react";

import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import AuthNavigator from "./AuthNavigator";
import HomeScreen from "../screens/Home/HomeScreen";
import OrderScreen from "../screens/Order/OrderScreen";

const Stack =
  createNativeStackNavigator();

export default function AppNavigator() {

  return (

    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false
      }}
    >

      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}