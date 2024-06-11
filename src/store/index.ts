import { configureStore } from "@reduxjs/toolkit";
import { categorySlice, menuItemSlice } from "./services";

export const store = configureStore({
    reducer: {
        categorySlice,
        menuItemSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;