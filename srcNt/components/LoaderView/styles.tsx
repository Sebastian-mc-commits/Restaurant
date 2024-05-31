import {StyleSheet} from 'react-native';
import colors from '../../utils/themes/colors';

const styles = StyleSheet.create({

  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    gap: 10
  },

  errorMessage: {
    color: colors.gray,
    fontSize: 25,
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default styles;
