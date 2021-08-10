import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Onboarding } from '../screens/Onboarding';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

const Auth = createStackNavigator();

export function AuthRoutes() {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Onboarding" component={Onboarding} />
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
}
