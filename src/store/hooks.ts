import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const createAppSlice = buildCreateSlice({
    creators: {
        asyncThunk: asyncThunkCreator
    }
})