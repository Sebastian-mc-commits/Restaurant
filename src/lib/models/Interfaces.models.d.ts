import { PayloadAction } from "@reduxjs/toolkit";

export interface Option {
    value: string | number;
    label: string | number;
}

export type FulFilled<T, A> = (state: T, action: PayloadAction<A>) => void

interface ThunkOptions<T, A> {
    fulfilled: FulFilled<T, A>;
    rejected: (state: T, action: PayloadAction<A>) => void;
    settled: (state: T, action: PayloadAction<A>) => void;
    pending: (state: T, action: PayloadAction<A>) => void
}