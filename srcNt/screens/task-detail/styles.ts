import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../utils/themes/colors';

const {height} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.gray,
  },
  
  cardContainer: {
    backgroundColor: colors.deepOceanBlue,
    padding: 5,
    marginHorizontal: 10,
    justifyContent: 'space-around',
    alignContent: 'center',
    height: height * 0.6
  },

  opacity: {
    opacity: 0.4,
    color: 'gray',
  },

  buttonContainer: {
    marginVertical: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'flex-end',
  },

  taskState: {
    gap: 10,
  },

  taskStateText: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  inputContainer: {
    marginTop: 20
  },

  inputStyle: {
    borderBottomColor: colors.skyBlue,
    color: colors.white
  }
});

export default styles;
