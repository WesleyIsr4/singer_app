import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Profile } from '../../components/Profile';
import { Projects } from '../../components/Projects';
import { Today } from '../../components/Today';
import api from '../../services/api';
import { styles } from './styles';

export function Dashboard() {
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

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
      </View>
      <View style={styles.content}>
        <Today />

        <View style={styles.section}>
          <View style={styles.cardContent}>
            <View style={styles.numberWrapper}>
              <Text style={styles.subtitle}>
                {project.length.toString().padStart(2, '0')}
              </Text>
            </View>
            <Text style={styles.title}>Projetos</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.numberWrapper}>
              <Text style={styles.subtitle}>
                {task.length.toString().padStart(2, '0')}
              </Text>
            </View>
            <Text style={styles.title}>Tarefas</Text>
          </View>
        </View>

        <View>
          <View style={styles.main}>
            <Text style={styles.subtitle}>Meus projetos</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Projetos');
              }}
            >
              <Text style={styles.paragraph}>ver mais</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Projects />
      </View>
    </View>
  );
}
