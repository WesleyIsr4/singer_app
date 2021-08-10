import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Profile } from '../../components/Profile';
import api from '../../services/api';
import { styles } from './styles';

interface RouteParams {
  projectId: string;
}

interface ITask {
  id: string;
  name: string;
  status: string;
  date: string;
  project: {
    name: string;
  };
}

export function MyProjects() {
  const route = useRoute();
  const [task, setTask] = useState<ITask[]>([]);
  const routeParams = route.params as RouteParams;

  const [selectedProject, setSelectedProject] = useState(routeParams.projectId);

  useEffect(() => {
    api.get(`/task/${selectedProject}`).then(response => {
      setTask(response.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
      </View>
      <View style={styles.content}>
        <View>
          <View style={styles.headerContent}>
            {task.slice(0, 1).map((item, key) => (
              <View key={key}>
                <Text style={styles.projects}>{item.project.name}</Text>
                <Text style={styles.tasks}>
                  {task.length.toString().padStart(2, '0')} tarefas
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View>
          <FlatList
            data={task}
            keyExtractor={task => task.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: task }) => (
              <View style={styles.container}>
                <View style={styles.card}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>{task.name}</Text>
                    <Text style={styles.subtitle}>{task.date}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}
