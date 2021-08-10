import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthState {
  user: User;
  token: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Singer:token',
        '@Singer:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('session', {
      email,
      password,
    });

    const { user, token } = response.data;

    await AsyncStorage.multiSet([
      ['@Singer:token', token],
      ['@Singer:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      user,
      token,
    });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Singer:token', '@Singer:user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@Singer:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
