import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./features";

export const store = configureStore({
    reducer: {
        categorySlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;