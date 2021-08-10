import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Calendar } from '../screens/Calendar';
import { Dashboard } from '../screens/Dashboard';
import { MyProjects } from '../screens/MyProjects';
import { Profile } from '../screens/Profile';
import { Projetos } from '../screens/Projetos';

const Auth = createStackNavigator();

export function AppRoutes() {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Dashboard" component={Dashboard} />
      <Auth.Screen name="Calendar" component={Calendar} />
      <Auth.Screen name="MyProject" component={MyProjects} />
      <Auth.Screen name="Projetos" component={Projetos} />
      <Auth.Screen name="Profile" component={Profile} />
    </Auth.Navigator>
  );
}
