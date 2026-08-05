// ここで createSliceしてreducer関数を作ります
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TimerState {
    seconds: number;
    isRunning: boolean;
    mode: 'up' | 'down';
};

const initialState: TimerState = {
    seconds: 0,
    isRunning: false,
    mode: 'up',
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        // stateの動きを定義
        // actionが送られてくる
        setCountdown(state, action: PayloadAction<number>) {
            state.mode = 'down';
            // payloadに付加された値をsecondsにセット
            // つまり、action.payloadにカウントダウンの秒数が入っている
            // 例えば、action.payloadが60なら、60秒のカウントダウン
            state.seconds = action.payload;
            state.isRunning = false;

        },
        setCountup(state) {
            state.mode = 'up';
            state.seconds = 0;
            state.isRunning = false;
        },
        start(state) {
            state.isRunning = true;
        },
        stop(state) {
            state.isRunning = false;
        },
        reset(state) {
            state.seconds = state.mode === 'up' ? 0 : state.seconds;
            state.isRunning = false;
        },
        tick(state) {
            if (state.mode === 'up') {
                state.seconds += 1;
            } else {
                if (state.seconds > 0) {
                    state.seconds -= 1;
                    if (state.seconds === 0) {
                        state.isRunning = false;
                    }
                }
            }
        },
    },
});

export const {
    setCountdown,
    setCountup,
    start,
    stop,
    reset,
    tick 
} = timerSlice.actions; // actionsをexportします
export default timerSlice.reducer // reducerをexportします