// configureStoreにreducerを登録
import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "../hooks/useTimer.slice.ts";
import editReducer from "../components/TimeEdit/edit.slice.ts";

export const store = configureStore({
    reducer: {
        timer: timerReducer,
        edit: editReducer,
    }
});

export default store;

// 外で使う時の型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;