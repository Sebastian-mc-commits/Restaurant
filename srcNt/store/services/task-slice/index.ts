import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getTaskById, getTasks} from './task.service';
import {ServerTypes, TaskTypes} from '../../../types';

interface TaskState {
  isLoading: boolean;
  error: boolean;
  tasks: TaskTypes.TaskType[];
  response: ServerTypes.Response;
}

const initialState: TaskState = {
  isLoading: false,
  error: false,
  tasks: [],
  response: {
    message: '',
    httpStatusCode: 0,
  },
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTasks.pending, state => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.tasks = null;
      state.response = action.payload as ServerTypes.Response;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.tasks = action.payload as TaskTypes.TaskType[];
    });
    builder.addCase(getTaskById.pending, state => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getTaskById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.tasks = null;
      state.response = action.payload as ServerTypes.Response;
    });
    builder.addCase(getTaskById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      const task: TaskTypes.TaskType[] = [action.payload as TaskTypes.TaskType];
      state.tasks = task;
    });
  },
});

export default taskSlice.reducer;
