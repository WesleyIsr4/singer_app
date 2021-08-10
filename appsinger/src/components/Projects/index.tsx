import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import api from '../../services/api';
import { styles } from './styles';

interface Project {
  id: string;
  name: string;
  type: string;
  taskPercente: string;
  totalTask: string;
}

export function Projects() {
  const [projects, setProject] = useState<Project[]>([]);

  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('/project').then(response => {
      setProject(response.data);
    });
  }, []);

  const navigateToProject = useCallback(
    (projectId: string) => {
      navigate('MyProject', { projectId });
    },
    [navigate],
  );

  return (
    <FlatList
      data={projects}
      keyExtractor={project => project.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: project }) => (
        <TouchableOpacity onPress={() => navigateToProject(project.id)}>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>{project.name}</Text>
                <Text style={styles.subtitle}>
                  {project.type} | {project.totalTask} tarefas
                </Text>
              </View>
              <View style={styles.section}>
                <View style={styles.bar}>
                  <View
                    style={{
                      height: 5,
                      borderRadius: 5,
                      width: `${project.taskPercente}%`,
                      backgroundColor: '#3AEABB',
                    }}
                  ></View>
                </View>
                <View style={styles.status}>
                  <Text>{project.taskPercente}%</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
}
