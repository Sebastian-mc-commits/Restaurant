//constants

export const serverUrl = (query: string) => `http://192.168.1.6:4000/${query}`;

export const services = {
  API_USER: (query: string) => serverUrl(`api/user/${query}`),
};

export const serverMethods = {
  GET_USER_BY_CREDENTIALS: () => services.API_USER('getUserByCredentials'),
  GET_USERS: () => services.API_USER('getUsers'),
};
