import { parseISO } from 'date-fns/esm';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Profile } from '../../components/Profile';
import { Today } from '../../components/Today';
import { theme } from '../../global/styles/theme';
import api from '../../services/api';
import { styles } from './styles';

interface Task {
  id: string;
  name: string;
  date: string;
  project: {
    name: string;
    type: string;
  };
}

interface Weekday {
  status: boolean;
  weekday: string;
  number?: number;
}

export function Calendar() {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | any>();
  const [task, setTasks] = useState<Task[]>([]);
  const [listTaskOfDay, setListTaskOfDay] = useState<Task[]>([]);
  const [listDays, setListDays] = useState<Weekday[]>([]);

  useEffect(() => {
    api.get('/task').then(response => {
      setTasks(response.data);
    });
  }, []);

  useEffect(() => {
    let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    let newListDays = [];

    for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
      let date = new Date(selectedYear, selectedMonth, dayNumber);
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');

      let selDate = `${year}-${month}-${day}`;

      let tasks = task.filter(t => t.date === selDate);

      newListDays.push({
        status: tasks.length > 0,
        weekday: days[date.getDay()],
        number: dayNumber,
      });
    }

    setListDays(newListDays);
    setSelectedDay(0);
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    let today = new Date();

    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  useEffect(() => {
    if (selectedDay > 0) {
      let date = new Date(selectedYear, selectedMonth, selectedDay);
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');

      let selectedDate = `${year}-${month}-${day}`;

      let taskOfDay = task.filter(tasks => tasks.date === selectedDate);

      setListTaskOfDay(taskOfDay);
    }
  }, [selectedDay]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
      </View>
      <View style={styles.content}>
        <Today />

        <View style={{ bottom: 20 }}>
          <ScrollView
            horizontal={true}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
          >
            {listDays.map((item, key) => (
              <TouchableOpacity
                onPress={() => setSelectedDay(item.number)}
                style={{
                  height: 100,
                  width: 70,
                  borderRadius: 5,
                  marginRight: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    item.number === selectedDay ? '#47eabe' : '#f5f7fb',
                }}
                key={key}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: theme.fonts.text400,
                    color: `${item.number === selectedDay ? '#fff' : '#000'}`,
                  }}
                >
                  {item.weekday}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: theme.fonts.title500,
                    color: `${item.number === selectedDay ? '#fff' : '#000'}`,
                  }}
                >
                  {item.number}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View>
          {listTaskOfDay.length > 0 && (
            <FlatList
              data={listTaskOfDay}
              keyExtractor={task => task.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: task }) => (
                <View style={styles.container}>
                  <View style={styles.card}>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>{task.name}</Text>
                      <Text style={styles.subtitle}>{task.project.name}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}
