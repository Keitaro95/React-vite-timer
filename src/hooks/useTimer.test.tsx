// timer時刻のdisplay表示を司る。stateの動きであるdispatch関数
import { describe, it, expect, beforeEach } from "vitest";
import timerReducer from "../store/store.ts"
import { TimerState } from "./useTimer.slice";

import {
    setCountdown,
    setCountup,
    start,
    stop,
    reset,
    tick 
} from './timerSlice';

describe('timerSlicerのテスト', () => {
    let initialState: TimerState;

    //それぞれのテスト前の初期値
    beforeEach(() => {
        initialState = { seconds:0, isRunning: false, mode: 'up' };
    });

    it('should handles start', () => {
        const next = timerReducer(initialState, start());
        expect(next.isRunning).toBe(true);
        expect(next.seconds).toBe(0);
    });
    it('should handles stop', () => {
        const next = timerReducer(initialState, start());
        expect(next.isRunning).toBe(true);
        expect(next.seconds).toBe(0);
    });

    it('should ticks up when mode is up', () => {
        const state = { ...initialState, seconds:5, isRunning: true, mode: 'up' };
        const next = timerReducer(state, tick())
        expect(next.seconds).toBe(6);
    });
    it('should ticks down when mode is down', () => {
        const state = { seconds: 1, isRunning: true, mode: 'down' };
        const next = timerReducer(state, tick())
        expect(next.seconds).toBe(0);
        expect(next.seconds).toBe(false);
    });
    it('should sets countdown mode with initial seconds', () => {
        const next = timerReducer(initialState, setCountdown(30));
        expect(next.mode).toBe('down');
        expect(next.seconds).toBe(0);
        expect(next.seconds).toBe(false);
    });
    it('should sets countup mode', () => {
        const prev = { seconds: 5, isRunning: true, mode: 'down' } as TimerState;
        const next = timerReducer(prev, setCountup());
        expect(next.mode).toBe('up');
        expect(next.seconds).toBe(0);
        expect(next.seconds).toBe(false);
    });
})