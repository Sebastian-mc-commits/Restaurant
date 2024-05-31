import {useState} from 'react';
import {TaskTypes} from '../../types';
import {View, Text, Button} from 'react-native';
import styles from './styles';

interface TaskTypeProps extends TaskTypes.TaskType {
  toggleTaskState: (id: number) => void;
}
const Task: React.FC<TaskTypeProps> = ({
  title,
  description,
  state,
  creationDate,
  toggleTaskState,
  id,
}): React.JSX.Element => {
  const [taskState, setTaskState] = useState(state);

  enum isTaskCompleted {
    COMPLETED,
    PENDING,
  }

  const onClickStateTask = () => {
    setTaskState((prevState: boolean) => !prevState);
    toggleTaskState(id);
  };

  return (
    <View
      styles={
        (styles.taskContainer,
        {
          backgroundColor: taskState ? '#E6E3D3' : '#BFBDB0',
        })
      }>
      <View styles={styles.task}>
        <Text>
          {taskState ? isTaskCompleted.COMPLETED : isTaskCompleted.PENDING}
        </Text>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <Text>{creationDate}</Text>
      </View>

      <Button onClick={onClickStateTask}>
        {state ? 'Complete Task' : 'Task Completed'}
      </Button>
    </View>
  );
};

export default Task;
