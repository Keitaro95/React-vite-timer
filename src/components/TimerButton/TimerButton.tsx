// タイマーのボタン。propsによって、ボタンのUIの種類が変わります

import React from 'react';

export interface TimerButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}


const TimerButton: React.FC<TimerButtonProps> = ({ onClick, disabled = false, children }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            // ボタンの状態によってスタイリングを変える
            className={`px-4 ${disabled ? 'bg-gray' : 'bg-blue'}`}
            >
            {children}
        </button>
    );
};

export default TimerButton;