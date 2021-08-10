import { useNavigation } from '@react-navigation/native';
import { parseISO } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Calendar from '../../assets/icons/Símbolo.png';
import api from '../../services/api';
import { styles } from './styles';

interface TaskDate {
  date: string;
}

export function Today() {
  const [task, setTask] = useState<TaskDate[]>([]);
  const [taskLenght, setTaskLenght] = useState<TaskDate[]>([]);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | any>();

  useEffect(() => {
    api.get('/task').then(response => {
      setTask(response.data);
    });
  }, [task]);

  useEffect(() => {
    let date = new Date(selectedYear, selectedMonth, selectedDay);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    let selectedDate = `${year}-${month}-${day}`;

    let taskOfDay = task.filter(tasks => tasks.date === selectedDate);

    if (taskOfDay.length > 0) {
      setTaskLenght(taskOfDay);
    }
  }, [task]);

  useEffect(() => {
    let today = new Date();

    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Calendar');
          }}
          style={styles.iconWrapper}
        >
          <Image source={Calendar} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.TextWrapper}>
          <View style={styles.user}>
            <Text style={styles.greeting}>Você tem</Text>
            <Text style={styles.username}>
              {taskLenght.length.toString().padStart(2, '0')} tarefas
            </Text>
          </View>
          <Text style={styles.message}>para finalizar hoje</Text>
        </View>
      </View>
    </View>
  );
}
