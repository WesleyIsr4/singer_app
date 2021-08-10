import { ReactNode } from 'react';

import { Text } from 'react-native';

import { Container } from './styles';

interface CreateProjectProps {
  children: ReactNode;
}

function CreateProject({ children }: CreateProjectProps) {
  return (
    <Container>
      <Text>CreateProject</Text>
      {children}
    </Container>
  );
}

export default CreateProject;
