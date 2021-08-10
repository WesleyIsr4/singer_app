import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../hooks/auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#246afd" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
}
