import React, {useEffect} from 'react';
import {View, Text, Button, FlatList, ActivityIndicator} from 'react-native';
import styles from './styles';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getTasks} from '../../store/services/task-slice/task.service';
import {TaskTypes} from '../../types';
import {TaskComponent} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootTasksStackParamList from '../../types/stackTypes/Tasks.types';

type TaskListProps = NativeStackScreenProps<
  RootTasksStackParamList,
  'TaskList'
>;

export default function TaskList({
  navigation,
}: TaskListProps): React.JSX.Element {
  const dispatchStore = useAppDispatch();

  const {tasks, error, isLoading} = useAppSelector(state => state.tasks);
  useEffect(() => {
    dispatchStore(getTasks());
  }, [dispatchStore]);

  const onTaskSelected = (id: number, title: string) => {
    navigation.navigate('TaskDetail', {
      id,
      title,
    });
  };

  const renderItem = ({item}: {item: TaskTypes.TaskType}) => (
    <TaskComponent {...item} onSelected={onTaskSelected} />
  );

  if (isLoading) {
    return <ActivityIndicator size={100} style={styles.activityIndicator} />;
  } else if (error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <FlatList data={tasks} renderItem={renderItem} style={styles.container} />
  );
}
