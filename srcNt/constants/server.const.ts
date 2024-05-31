export const PORT: number = 4000;
export const serverUrl = (query: string) =>
  `http://10.170.67.205:${PORT}/${query}`;

export const services = {
  API_TASK: (query: string) => serverUrl(`api/task/${query}`),
};
export const serverMethods = {
  GET_TASKS: () => services.API_TASK('getTasks'),
  GET_TASK_BY_ID: (id: number) => services.API_TASK(`getTaskById/${id}`)
};
