import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: '13%',
  },
  cardContent: {
    backgroundColor: '#F5F7FB',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    height: 62,
  },

  numberWrapper: {
    width: 56,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#D9DBE9',
  },

  subtitle: {
    fontSize: 20,
    fontFamily: theme.fonts.text600,
    color: '#585666',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: theme.fonts.title500,
  },

  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#D9DBE9',
    paddingBottom: 24,
  },

  paragraph: {
    fontSize: 13,
    color: '#706E7A',
    fontFamily: theme.fonts.title400,
  },
});
