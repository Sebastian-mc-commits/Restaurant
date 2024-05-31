import {StyleSheet} from 'react-native';
import colors from '../../utils/themes/colors';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    marginVertical: 10,
    // height: 5,
    justifyContent: 'space-around',
  },
  inputContainer: {
    gap: 2,
    marginHorizontal: 10,
  },

  labelText: {
    color: colors.gray,
    fontSize: 15,
  },

  inputStyle: {
    borderBottomColor: colors.skyBlue,
    borderBottomWidth: 1,
    fontSize: 16,
  },

  errorContainerStyle: {
    marginVertical: 6,
    backgroundColor: colors.dangerRgba,
    padding: 12,
    borderLeftColor: colors.danger,
    borderLeftWidth: 5,
  },

  errorMessageStyle: {
    color: colors.danger,
  },
});

export default styles;
