import React from 'react';
import {TaskTypes} from '../../types';
import {TouchableOpacity, Text, View, Button} from 'react-native';
import Card from '../Card';
import styles from './styles';
import colors from '../../utils/themes/colors';

interface TaskProps extends Omit<TaskTypes.TaskType, 'userId'> {
  onSelected: (id: number, title: string) => void;
}

const TaskComponent: React.FC<TaskProps> = ({
  creation,
  description,
  id,
  state,
  title,
  onSelected,
}): React.JSX.Element => {
  enum TaskState {
    COMPLETED = 'Completado',
    PENDING = 'Pendiente',
  }

  const isTaskCompleted = state === 1;
  return (
    <TouchableOpacity onPress={() => onSelected(id, title)}>
      <Card styles={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text>{description}</Text>

        <View style={styles.taskStateContainer}>
          {/* <Text style={styles.title}>{creation.toString()}</Text> */}
          <Text
            style={
              isTaskCompleted
                ? {
                    color: colors.skyBlue,
                  }
                : {
                    opacity: 0.4,
                    color: colors.gray,
                  }
            }>
            {isTaskCompleted ? TaskState.COMPLETED : TaskState.PENDING}
            <Button title="Go to Task" onPress={() => onSelected(id, title)} />
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default TaskComponent;
