// pagesで画面レンダリング
// - TimerButtonControlsでボタンの動きを定義して
// - TimerButtonでボタンコンポーネントをかく。typeによって展開を変える。
// - TimerDisplayはタイマー時刻の表示
import React, { Children, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from "../../store/store";
import { startEdit, updateInput, cancelEdit } from '../TimeEdit/edit.slice';
import { Toast, ToastPortal } from '../ToastPortal/Toast';


export interface TimerDisplayProps {
    seconds: number;
    onSetSeconds?: (seconds: number) => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ seconds, onSetSeconds }) => {
    // dispatch関数を展開
    const dispatch = useDispatch<AppDispatch>();
    const { isEditing, inputValue } = useSelector((state: RootState) => state.edit);

    const mode = useSelector((state: RootState) => state.timer.mode);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        if (mode === "down" && seconds === 0) {
            setShowToast(true);
        }
    }, [mode, seconds]);

    const pad = (num: number) => num.toString().padStart(2, '0');
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;

    const commit = () => {
        const num = parseInt(inputValue, 10);
        if (!isNaN(num) || num < 0) {
            alert("有効な数値を入力してください。");
            return;
        }
        if (onSetSeconds) {
            onSetSeconds(num);
        }
        dispatch(cancelEdit());
    };

    const handleKeyDown: React.KeyboardEventHandler = (e) => {
        if (e.key === 'Enter') commit();
        else if (e.key === 'Escape') dispatch(cancelEdit());
    };

    const [showToast, setShowToast] = useState(false);
    
    return (
        <>
            {showToast && (
                <ToastPortal targetSelector="#toast-portal">
                    <Toast
                        message="終了！"
                        onClose={() => setShowToast(false)}
                    />
                </ToastPortal>
            )}
            <div className="text-4xl font-mono p-4">
                {isEditing && onSetSeconds ? (
                    <input
                        ref={inputRef}
                        type="number"
                        min="0"
                        step="1"
                        value={inputValue}
                        placeholder={`${pad(minutes)}:${pad(remainderSeconds)}`}
                        onChange={(e) => dispatch(updateInput(e.target.value))}
                        onBlur={commit}
                        onKeyDown={handleKeyDown}
                        className="w-24 text-center border-b-2 outline-none"
                    />
                ) : (
                    <span onClick={() =>onSetSeconds && dispatch(startEdit(seconds))}>
                        {pad(minutes)}:{pad(remainderSeconds)}
                    </span>
                )}
            </div>
        </>
    );
};

export default TimerDisplay;