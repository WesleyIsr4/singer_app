import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: transparent;

  ${props =>
    props.isErrored &&
    css`
      border-color: #ed2e7e;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #246afd;
    `}
`;

export const InputText = styled(TextInput)`
  flex: 1;
  color: #000;
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
