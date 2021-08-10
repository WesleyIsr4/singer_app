import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
    padding: 24,
    paddingTop: getStatusBarHeight() + 44,
  },
  user: {
    flexDirection: 'row',
  },
  greeting: {
    fontFamily: theme.fonts.title400,
    fontSize: 24,
    color: '#fff',
    marginRight: 6,
  },
  username: {
    fontFamily: theme.fonts.title600,
    fontSize: 24,
    color: '#fff',
  },
  message: {
    fontFamily: theme.fonts.text400,
    color: '#fff',
    fontSize: 13,
  },
  avatar: {
    marginTop: 7,
    width: 55,
    height: 55,
    borderRadius: 8,
  },
});
