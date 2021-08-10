import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { styles } from './styles';

export function Profile() {
  const { user, signOut } = useAuth();

  const [task, setTask] = useState([]);
  const [project, setProject] = useState([]);

  useEffect(() => {
    api.get('/project').then(response => {
      setProject(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/task').then(response => {
      setTask(response.data);
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={['#34EAB9', '#91EAD2']}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Image style={styles.profile} source={{ uri: user.avatar_url }} />
            <Text style={styles.username}>{user.name}</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.main}>
        <View style={styles.overview}>
          <View style={styles.overviewCards}>
            <View style={styles.cardProject}>
              <View style={styles.numberWrapper}>
                <Text style={styles.title}>14</Text>
              </View>
              <Text style={styles.subtitle}>Projetos</Text>
            </View>
            <View style={styles.cardTask}>
              <View style={styles.numberWrapper}>
                <Text style={styles.title}>20</Text>
              </View>
              <Text style={styles.subtitle}>Tarefas</Text>
            </View>
          </View>
          <View style={styles.overviewCards}>
            <View style={styles.cardCompleted}>
              <View style={styles.numberWrapper}>
                <Text style={styles.title}>20</Text>
              </View>
              <Text style={styles.subtitle}>Tarefas completadas</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <Button title="Trocar a foto"></Button>
          <Button title="Editar conta"></Button>
          <Button onPress={() => signOut()} title="Sair"></Button>
        </View>
      </View>
    </View>
  );
}
