import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 24,
    paddingTop: getStatusBarHeight() + 44,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontFamily: theme.fonts.title600,
    marginTop: 16,
    color: '#fff',
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  overview: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#D9DBE9',
    paddingBottom: 24,
  },
  overviewCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardProject: {
    backgroundColor: '#F5F7FB',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 75,
  },
  cardTask: {
    backgroundColor: '#F5F7FB',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 75,
    marginLeft: 16,
  },
  cardCompleted: {
    backgroundColor: '#F5F7FB',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 75,
    marginTop: 16,
  },
  numberWrapper: {
    width: 56,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#D9DBE9',
  },

  title: {
    fontSize: 20,
    fontFamily: theme.fonts.text600,
    color: '#585666',
  },
  subtitle: {
    fontSize: 13,
    color: '#706E7A',
    fontFamily: theme.fonts.title400,

    marginLeft: 16,
  },
  main: {
    padding: 24,
  },
});
