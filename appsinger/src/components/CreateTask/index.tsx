import { ReactNode } from 'react';

import { Text } from 'react-native';

import { Container } from './styles';

interface CreateTaskProps {
  children: ReactNode;
}

function CreateTask({ children }: CreateTaskProps) {
  return (
    <Container>
      <Text>CreateTask</Text>
      {children}
    </Container>
  );
};

export default CreateTask;
