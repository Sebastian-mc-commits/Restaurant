import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TaskDetail, TaskList, UserAuth} from '../../screens';
import RootTasksStackParamList from '../../types/stackTypes/Tasks.types';
import {TouchableOpacity, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function TasksNavigation() {
  const Stack = createNativeStackNavigator<RootTasksStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="TaskList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="TaskList"
        component={TaskList}
        options={{
          title: 'Tasks',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.warn('Hello you my little fella')}>
              <Text>+</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name="TaskDetail" component={TaskDetail} />
    </Stack.Navigator>
  );
}
