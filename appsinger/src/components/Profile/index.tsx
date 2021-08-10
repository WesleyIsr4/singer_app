import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { styles } from './styles';

export function Profile() {
  const { user } = useAuth();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={['#34EAB9', '#91EAD2']}
      >
        <View style={styles.content}>
          <View>
            <View style={styles.user}>
              <Text style={styles.greeting}>Olá,</Text>
              <Text style={styles.username}>{user.name}</Text>
            </View>
            <Text style={styles.message}>Mantenhas as tarefas em dia</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}
          >
            <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
