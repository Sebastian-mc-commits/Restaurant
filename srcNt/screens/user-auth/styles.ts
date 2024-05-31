import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../utils/themes/colors';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.paleMint,
    gap: 10
  },

  cardContainer: {
    backgroundColor: colors.white,
    padding: 5,
    marginHorizontal: 10,
    height: height * 0.25,
  },

  authenticateText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default styles;
