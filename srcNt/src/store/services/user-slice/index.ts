import { createSlice } from '@reduxjs/toolkit';
import { getUserByCredentials, getUsers } from './user.service';
import { UserTypes, ServerTypes } from '../../../types';

type User = UserTypes.User;
type Response = ServerTypes.Response;

interface UserState {
  isLoading: boolean;
  currentUser: User | null;
  error: boolean;
  requestUsers: User[];
  response: Response;
}

const initialState: UserState = {
  isLoading: true,
  currentUser: null,
  error: false,
  requestUsers: [],
  response: {
    customMessage: '',
    httpStatusCode: 0,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserByCredentials.pending, state => {
      state.isLoading = true;
      state.error = false;
    }),
      builder.addCase(getUserByCredentials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.response = action.payload as Response;
      }),
      builder.addCase(getUserByCredentials.fulfilled, (state, action) => {
        const { ...user } = action.payload as User;
        state.currentUser = user;
        state.isLoading = false;
        state.error = false;
      });
    builder.addCase(getUsers.pending, state => {
      state.isLoading = true;
      state.error = false;
    }),
      builder.addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.response = action.payload as Response;
      }),
      builder.addCase(getUsers.fulfilled, (state, action) => {
        state.requestUsers = action.payload as User[];
        state.isLoading = false;
        state.error = false;
      });
  },
});

export default userSlice.reducer;

// export const userAPI = createApi({
//   reducerPath: 'userAPI',
//   refetchOnFocus: false,
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:4000/api/user',
//   }),
//
//   endpoints: (builder: any) => ({
//     // getUser: (builder: any).query<User<number>, null>({
//     //     query: () => "getUser"
//     // })
//
//     getUser: builder.mutation<Response, UserCredentials>({
//       query: (data: UserCredentials) => ({
//         url: 'getUser',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {useGetUserMutation} = userAPI;
