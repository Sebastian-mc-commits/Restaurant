import {StyleSheet} from 'react-native';
import colors from '../../utils/themes/colors';
import {getRandomBetween} from '../../utils/functions';

const arrayColors: string[] = [
  colors.beige,
  colors.papayaWhip,
  colors.columbiaBlue,
];

const styles = StyleSheet.create({
  container: {
    gap: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 7,
    backgroundColor: getRandomBetween<string>(arrayColors),
  },

  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
  },

  taskStateContainer: {
    flex: 1,
    marginVertical: 7,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },

  opacity: {
    opacity: 0.4,
    color: 'gray',
  },
});

export default styles;
