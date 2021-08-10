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

  weekday: {
    height: 100,
    width: 70,
    borderRadius: 5,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTrue: {
    backgroundColor: '#47EABE',
    color: '#fff',
  },

  statusFalse: {
    backgroundColor: '#F5F7FB',
  },

  section: {
    marginTop: 32,
  },

  card: {
    marginTop: 16,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#F5F7FB',
    borderRadius: 5,
    height: 75,
  },

  cardContent: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },

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
});
