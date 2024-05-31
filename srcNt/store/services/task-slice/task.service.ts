import {createAsyncThunk} from '@reduxjs/toolkit';
import {serverMethods} from '../../../constants/server.const';
import {ServerTypes, TaskTypes} from '../../../types';

export const getTasks = createAsyncThunk(
  'task/getTasks',
  async (): Promise<TaskTypes.TaskType[] | ServerTypes.Response> => {
    try {
      const getResponse = await fetch(serverMethods.GET_TASKS());

      const tasks = await getResponse.json();

      return tasks as TaskTypes.TaskType[];
    } catch {
      return {
        httpStatusCode: 400,
        message: 'Sadness',
      };
    }
  },
);

export const getTaskById = createAsyncThunk(
  'task/getById',
  async (id: number): Promise<TaskTypes.TaskType[] | ServerTypes.Response> => {
    try {
      const getResponse = await fetch(serverMethods.GET_TASK_BY_ID(id));

      const task = await getResponse.json();

      return task as TaskTypes.TaskType[];
    } catch {
      return {
        httpStatusCode: 400,
        message: 'Sadness',
      } as ServerTypes.Response;
    }
  },
);
