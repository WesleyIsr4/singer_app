import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#F5F7FB',
    borderRadius: 5,
  },

  content: {
    flex: 1,
  },

  header: {},
  title: {
    fontSize: 17,
    fontFamily: theme.fonts.title600,
    color: '#585666',
  },
  subtitle: {
    fontSize: 13,
    fontFamily: theme.fonts.text500,
    color: '#706E7A',
  },

  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: 230,
  },

  bar: {
    marginTop: 16,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
  },

  progress: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#3AEABB',
    width: '0%',
  },

  status: {
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
