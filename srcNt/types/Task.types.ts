import {ServerTypes} from '.';

export interface TaskType {
  id: number;
  title: string;
  description: string;
  state: number;
  creation: Date;
  userId: number;
}

export interface TaskResponse extends ServerTypes.Response {
  task: TaskType;
}
