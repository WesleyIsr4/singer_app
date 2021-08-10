import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Profile } from '../../components/Profile';
import { Projects } from '../../components/Projects';
import api from '../../services/api';
import { styles } from './styles';

export function Projetos() {
  const [project, setProject] = useState([]);

  useEffect(() => {
    api.get('/project').then(response => {
      setProject(response.data);
    });
  }, [project]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
      </View>
      <View style={styles.content}>
        <View>
          <View style={styles.main}>
            <Text style={styles.subtitle}>Meus projetos</Text>
            <Text style={styles.paragraph}>{project.length} projetos</Text>
          </View>
        </View>

        <Projects />
      </View>
    </View>
  );
}
