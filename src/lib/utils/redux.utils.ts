import { PayloadAction } from "@reduxjs/toolkit";
import { FulFilled, ThunkOptions } from "../models/Interfaces.models"
import { AsyncOperations, ErrorType, LoadingTypes } from "../types"

export const thunkHandler = <Action, DataType, State extends AsyncOperations<DataType>>(
    onFulfilled: FulFilled<State, Action>,
    loadingType: LoadingTypes
): ThunkOptions<State, unknown> => ({
    fulfilled: (state, action) => {
        onFulfilled(state, action as PayloadAction<Action>)
    },

    rejected: (state, action) => {
        state.isLoading = false;
        state.loadingType = loadingType
        state.hasError = "error"

        if (state.hasError === "error") {
            state.error = action.payload as unknown as ErrorType;
        }
    },

    settled: (state) => {
        state.isLoading = false
        state.loadingType = ""
    },

    pending: (state) => {
        state.isLoading = true
        state.loadingType = loadingType
        state.hasError = "non-error"
    },
})