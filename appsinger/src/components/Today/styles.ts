import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F7FB',
    position: 'relative',
    bottom: '11%',
    borderRadius: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    padding: 24,
  },
  TextWrapper: {
    marginLeft: 20,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontFamily: theme.fonts.title400,
    fontSize: 13,
    color: '#000',
    marginRight: 4,
  },
  username: {
    fontFamily: theme.fonts.title600,
    fontSize: 13,
    color: '#000',
  },
  message: {
    fontFamily: theme.fonts.text400,
    color: '#000',
    fontSize: 13,
  },
  avatar: {
    marginTop: 10,
    width: 55,
    height: 55,
    borderRadius: 8,
  },
  iconWrapper: {
    width: 60,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#D9DBE9',
  },
  icon: {
    marginRight: 24,
  },
});
