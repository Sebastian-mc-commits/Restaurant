import React, {useId, useEffect, useReducer} from 'react';
import {Text, TextInput, Button, View, FlatList} from 'react-native';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootTasksStackParamList from '../../types/stackTypes/Tasks.types';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getTaskById} from '../../store/services/task-slice/task.service';
import {Card, Input, LoaderView} from '../../components';
import colors from '../../utils/themes/colors';
import {InputComponentProps} from '../../components/Input';
import {
  FilteredIndexTaskTypes,
  IndexTaskTypes,
  TaskAction,
  TaskActionKind,
  TaskReduceState,
} from './task-detail-types';
import inputReducer from '../../utils/functions/inputReducer';

type TaskDetailProps = NativeStackScreenProps<
  RootTasksStackParamList,
  'TaskDetail'
>;

export default function TaskDetail({
  route,
}: TaskDetailProps): React.JSX.Element {
  const {id} = route.params;

  const dispatchStore = useAppDispatch();
  const {error, isLoading, tasks} = useAppSelector(state => state.tasks);

  useEffect(() => {
    dispatchStore(getTaskById(id));
  }, [dispatchStore, id]);

  const {creation, description, state, title} = tasks[0];

  const initialState: TaskReduceState = {
    description: {
      hasError: false,
      value: description,
      errorMessage: '',
      isTouched: false,
    },
    isTaskCompleted: state === 1,
    title: {
      hasError: false,
      value: title,
      errorMessage: '',
      isTouched: false,
    },
    isFormValid: false,
  };

  const formReducer = (state: TaskReduceState, action: TaskAction) => {
    const {UPDATE_FORM, SET_FORM_VALID, SET_IS_TASK_COMPLETED} = TaskActionKind;
    const {payload, type} = action;

    switch (type) {
      case UPDATE_FORM: {
        return {
          ...state,
          [payload.name]: {
            ...payload.data,
          },
        };
      }

      case SET_FORM_VALID: {
        return {
          ...state,
          isFormValid: action.payload.data.value as boolean,
        };
      }

      case SET_IS_TASK_COMPLETED: {
        return {
          ...state,
          isTaskCompleted: action.payload.data.value as boolean,
        };
      }
    }
  };

  const [formState, dispatchReducer] = useReducer(formReducer, initialState);

  const isTaskCompleted = formState.isTaskCompleted;

  const onDispatchFormReducer = (
    isTouched: boolean,
    type: FilteredIndexTaskTypes,
    text: string | boolean,
  ) => {
    const {hasError, message} = inputReducer<typeof text>(text, type);
    dispatchReducer({
      type: TaskActionKind.UPDATE_FORM,
      payload: {
        name: type,
        data: {
          hasError,
          value: text,
          errorMessage: message,
          isTouched,
        },
      },
    });
  };

  const onChangeInputText = (type: FilteredIndexTaskTypes, text: string) => {
    // onDispatchFormReducer(
    //   false,
    //   TaskActionKind.UPDATE_FORM,
    //   text,
    //   type,
    //   dispatchReducer,
    // );
    onDispatchFormReducer(false, type, text);

    let isFormValid = true;
    for (const key in formState) {
      const value = formState[key as IndexTaskTypes];

      if (typeof value === 'boolean' || !('hasError' in value)) {
        continue;
      }

      if (value.hasError) {
        isFormValid = false;
        break;
      }
    }

    dispatchReducer({
      type: TaskActionKind.SET_FORM_VALID,
      payload: {
        data: {
          value: isFormValid,
          errorMessage: '',
          hasError: false,
          isTouched: true,
        },
        name: 'isFormValid',
      },
    });
  };

  const onChangeInputBlur = (type: FilteredIndexTaskTypes) => {
    const value = formState[type].value;
    onDispatchFormReducer(true, type, value);
  };

  const changeTaskState = () => {
    dispatchReducer({
      type: TaskActionKind.SET_IS_TASK_COMPLETED,
      payload: {
        data: {
          errorMessage: '',
          hasError: false,
          value: !formState.isTaskCompleted,
          isTouched: true,
        },
        name: 'isTaskCompleted' as IndexTaskTypes,
      },
    });
  };

  const onSaveChanges = () => {
    console.log(formState);
  };

  interface RenderInputType extends InputComponentProps {
    inputKey: string;
  }

  const inputData: RenderInputType[] = [
    {
      errorMessage: formState.title.errorMessage,
      hasError: formState.title.hasError,
      value: formState.title.value as string,
      label: 'Title',
      onChangeText: (text: string) => onChangeInputText('title', text),
      onBlur: () => onChangeInputBlur('title'),
      inputKey: useId(),
      isTouched: formState.title.isTouched,
    },

    {
      errorMessage: formState.description.errorMessage,
      hasError: formState.description.hasError,
      value: formState.description.value as string,
      label: 'Description',
      onChangeText: (text: string) => onChangeInputText('description', text),
      onBlur: () => onChangeInputBlur('description'),
      inputKey: useId(),
      isTouched: formState.description.isTouched,
    },
  ];

  const renderInputItem = ({item}: {item: InputComponentProps}) => (
    <Input
      {...item}
      inputStyles={styles.inputStyle}
      inputContainer={styles.inputContainer}
    />
  );

  const onHandleReloadData = () => {
    dispatchStore(getTaskById(id));
  };

  return (
    <LoaderView
      styles={styles.container}
      hasError={error}
      isLoading={isLoading}
      onHandleReloadData={onHandleReloadData}>
      <Card styles={styles.cardContainer}>
        <FlatList
          data={inputData}
          renderItem={renderInputItem}
          keyExtractor={(item: RenderInputType) => item.inputKey}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.taskState}>
            <Text style={styles.taskStateText}>
              Task {isTaskCompleted ? 'COMPLETED' : 'PENDING'}
            </Text>
            <Button
              title="Change the state of the task"
              color={
                isTaskCompleted ? colors.darkTurquoise : colors.greenishBlue
              }
              onPress={changeTaskState}
            />
          </View>
          <Button
            title="Save Changes"
            color={colors.deepGreen}
            onPress={onSaveChanges}
            disabled={!formState.isFormValid}
          />
        </View>
        <TextInput value={creation.toString()} style={styles.opacity} />
      </Card>
    </LoaderView>
  );
}
