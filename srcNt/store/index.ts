import {configureStore} from '@reduxjs/toolkit';
import {taskSlice} from './services';

const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
