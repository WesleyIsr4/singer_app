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

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#D9DBE9',
    paddingBottom: 24,
  },

  projects: {
    fontSize: 20,
    fontFamily: theme.fonts.title600,
    color: '#585666',
  },

  tasks: {
    fontSize: 13,
    color: '#706E7A',
    fontFamily: theme.fonts.title400,
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
