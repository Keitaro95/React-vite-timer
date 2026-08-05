// timerの動作を司るカスタムフック。 use~としてカスタムフックとして、新しいuseEffect関数として登録できる。
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
    setCountdown,
    setCountup,
    start,
    stop,
    reset,
    tick 
} from '../hooks/useTimer.slice';

// カスタムフック
export const useTimer = () => {
    // dispatch関数。これでstart, stop, reset, tickを発行できるようになります
    const dispatch = useDispatch<AppDispatch>();
    // reducerが扱うstateを取得します。useSelectorの中身は、グローバルなReducerのstateから
    // timer　のstateを指定しています
    // state.timerはTimerState型
    const { seconds, isRunning, mode } = useSelector((state: RootState) => state.timer)
    useEffect(() => {
        if (!isRunning) return;
        // ここが実際のタイマー。1秒ごとにtickアクションを発行
        const id = window.setInterval(() => dispatch(tick()), 1000);
        // クリーンナップ関数
        return () => clearInterval(id);
        // isRunning, dispatchが変わると、useEffectの中の関数が再レンダリングされます
        // つまり、タイマーon/offやstart, stop, reset, tickのアクションに変更があると、再レンダリングされます
    }, [isRunning, dispatch]);

    // それ以外のdispatch関数を定義します
    const initCountup = () => dispatch(setCountup())
    const initCountdown = (sec: number) => dispatch(setCountdown(sec))
    const handleStart = () => dispatch(start());
    const handleStop = () => dispatch(stop());
    const handleReset = () => dispatch(reset())

    // 全体として、この関数はこれらを返します
    return {
        seconds,
        isRunning, 
        mode,
        initCountup,
        initCountdown,
        start: handleStart,
        stop: handleStop,
        reset: handleReset
    };
};