import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 30px ${Platform.OS === 'android' ? 100 : 50}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #000;
  font-family: ${({ theme }) => theme.fonts.title600};
  margin: 64px 0 24px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  border-color: #d9dbe9;
  padding: 12px 0 ${12 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #000;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.text500};
  margin-left: 16px;
`;

export const Icon = styled(FeatherIcon)``;
