// pagesで画面レンダリング
// - TimerButtonControlsでボタンの動きを定義して
// - TimerButtonでボタンコンポーネントをかく。typeによって展開を変える。
// - TimerDisplayはタイマー時刻の表示

import { useState, useEffect } from "react"
import { useTimer } from "../../hooks/useTimer"
import { CurrentTime } from "../CurrentTime/CurrentTime"
import  TimerDisplay  from "../TimerDisplay/TimerDisplay"
import TimerButton from "../TimerButton/TimerButton"
import { ToastPortal, Toast } from "../ToastPortal/Toast"


export default function TimerPage() {
    console.log("🔔 TimerPage render");
    // hooks/useTimer ここで全て使う
    const {
        seconds,
        isRunning,
        mode,
        initCountup,
        initCountdown,
        start,
        stop, 
        reset,
    } = useTimer();

    const [inputSec, setInputSec] = useState(60);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (!isRunning && mode === "down" && seconds === 0) {
            setShowToast(true)
        }
    }, [isRunning, mode, seconds]);

    const handleCloseToast = () => {
        setShowToast(false);
    };
    
    // ここでreducerからの状態管理を受け取る
    return (
        <div className="container">
            {/* 現在時刻表示 */}
            <CurrentTime />
            
            {/* タイマー */}
            <TimerDisplay seconds={seconds}/>


            <div>
                <TimerButton onClick={initCountup}>
                    Count Up
                </TimerButton>
                <input
                    type="number"
                    value={inputSec}
                    onChange={e => setInputSec(Number(e.target.value))}
                    min={0}
                />
                <TimerButton onClick={() => initCountdown(inputSec)}>
                    Count Down
                </TimerButton>
            </div>

            {/* ボタンのUI */}
            <div>
                {!isRunning
                    ? <TimerButton onClick={start}>Start</TimerButton>
                    : <TimerButton onClick={stop}>Stop</TimerButton>
                }
                <TimerButton onClick={reset}>Reset</TimerButton>
            </div>

            {showToast && (
                <ToastPortal>
                    <Toast message="終了!" onClose={handleCloseToast}/>
                </ToastPortal>

            )}
        </div>
    )
}