import {createAsyncThunk} from '@reduxjs/toolkit';
import type {UserTypes} from '../../../types/index';
import {serverMethods} from '../../../constants/server.const';

export const getUserByCredentials = createAsyncThunk(
  'user/getUser',
  async (
    body: UserTypes.UserCredentialsTypes
  ): Promise<Response | UserTypes.User> => {
    const getResponse = await fetch(serverMethods.GET_USER_BY_CREDENTIALS(), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    });

    const userResponse = await getResponse.json();

    return userResponse;
  }
);

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (): Promise<Response | UserTypes.User[]> => {
    const getResponse = await fetch(serverMethods.GET_USERS());
    const users = getResponse.json();

    return users;
  }
);
