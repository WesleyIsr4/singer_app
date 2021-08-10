import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import person from '../../assets/person.png';
import { Button } from '../../components/Button';
import { Container, Content, Header, Image, Title } from './styles';

export function Onboarding() {
  const navigation = useNavigation();
  return (
    <Container>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={['#34EAB9', '#91EAD2']}
      >
        <Header></Header>
      </LinearGradient>
      <Image source={person}></Image>
      <Content>
        <Title>Organize suas tarefas em um só lugar</Title>
        <Button
          title="Continuar"
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        ></Button>
      </Content>
    </Container>
  );
}
