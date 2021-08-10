import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 100 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #000;

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

  margin-right: 16px;
`;
