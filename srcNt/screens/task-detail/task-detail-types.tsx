export enum TaskActionKind {
  UPDATE_FORM = 'UPDATE_FORM',
  SET_FORM_VALID = 'SET_FORM_VALID',
  SET_IS_TASK_COMPLETED = 'SET_IS_TASK_COMPLETED',
}

export type PayloadType = {
  value: string | boolean;
  hasError: boolean;
  errorMessage: string;
  isTouched: boolean;
};

export interface TaskReduceState {
  description: PayloadType;
  isTaskCompleted: boolean;
  title: PayloadType;
  isFormValid: boolean;
}

export type IndexTaskTypes = keyof TaskReduceState;
export type ExcludedTaskTypes = 'isFormValid' | 'isTaskCompleted';
export type FilteredIndexTaskTypes = Exclude<IndexTaskTypes, ExcludedTaskTypes>;

export interface TaskAction {
  type: TaskActionKind;
  payload: {
    data: PayloadType;
    name: IndexTaskTypes;
  };
}
