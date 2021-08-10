import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { ButtonText, Container, Icon, IconWrapper, Teste } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <Teste>
      <Container {...rest}>
        <IconWrapper>
          <Icon name="arrow-right" size={18} />
        </IconWrapper>
        <ButtonText>{title}</ButtonText>
      </Container>
    </Teste>
  );
}
