// timerが終わると表示されるToast
// state.seconds === 0 になると「終了！」と表示される
//  つまり、 tick()を使い、 modeが downで、　state.seconds === 0 の時に表示される

import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export interface ToastPortalProps { 
    targetSelector?: string;
    children: ReactNode;
};

export const ToastPortal: React.FC<ToastPortalProps> = ({ 
    targetSelector = "#toast-portal",
    children 
}) => {
    const [target, setTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // ターゲットのセレクタを指定して要素を取得
        const El = document.querySelector<HTMLElement>(targetSelector);
        setTarget(El);
    }, [targetSelector]);

    if (!target) return null;
    return createPortal(children, target);
};

export interface ToastProps { 
    message: string;
    duration?: number;
    onClose?: () => void;
};

export const Toast: React.FC<ToastProps> = ({ 
    message, 
    duration = 3000, 
    onClose, 
}) => {
    useEffect(() => {
        const id = setTimeout(() => { 
            onClose?.();
        }, duration);
        return () => clearTimeout(id);
    }, [duration, onClose]);

    return (
        <div className="toast">
            {message}
        </div>
    );
};


  // .toast {
            //   position: fixed;
            //   bottom: 20px;
            //   left: 50%;
            //   transform: translateX(-50%);
            //   padding: 12px 24px;
            //   background: rgba(0, 0, 0, 0.8);
            //   color: #fff;
            //   border-radius: 4px;
            //   font-weight: bold;
            //   animation: fadeInOut 3s forwards;
            // }
            
            // @keyframes fadeInOut {
            //   0% { opacity: 0; }
            //   10% { opacity: 1; }
            //   90% { opacity: 1; }
            //   100% { opacity: 0; }
            // }