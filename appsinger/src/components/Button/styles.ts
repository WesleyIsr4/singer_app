import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Teste = styled.View`
  border: 1px solid #e3e3e5;
  border-radius: 5px;
  margin-top: 16px;
`;
export const Container = styled(RectButton)`
  width: 100%;
  height: 56px;
  background: #fafafc;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  flex: 1;
  color: #666666;
  font-size: 15px;
  text-align: center;
`;

export const IconWrapper = styled.View`
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-right-color: #e9e9eb;
`;

export const Icon = styled(FeatherIcon)`
  color: #585666;
`;
