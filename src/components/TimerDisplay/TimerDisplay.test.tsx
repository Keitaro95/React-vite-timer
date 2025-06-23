import React from "react";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'
import { useDispatch, useSelector, Provider } from 'react-redux';
import { RootState, AppDispatch } from "../../store/store";
import { startEdit, updateInput, cancelEdit } from '../store/edit.slice';


// 初期設定
function setup(seconds: number, onSetSeconds?: (sec: number) => void) {
    const store = configureStore({
        reducer: { edit: editReducer },
    });
    const utils = render(
        <Provider store={store}>
            <TimerDisplay seconds={seconds} onSetSeconds={onSetSeconds} />
        </Provider>
    );
    return { ...utils, store };
}

describe('TimerDisplay Component', () => {
    it('should renders time in MM:SS when not Editing', () => {
        setup(125);
        expect(screen.getByText('02:05')).toBeTruthy();
    });

    it('should enters edit mode and shows input when clicking display', () => {
        const onSet = vi.fn();
        const { store } = setup(45, onSet);

        fireEvent.click(screen.getByText('00:45'));

        const input = screen.getByRole('spinbutton') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('45');

        expect(store.getState().edit.isEditing).toBe(true);
    })

    it('should updates input value on change', () => {
        const onSet = vi.fn();
        setup(10, onSet);

        fireEvent.click(screen.getByText('00:10'));
        const input = screen.getByRole('spinbutton') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '20' } });
        expect(input.value).toBe('20');
    });

    test('commitでblurになり、onSetSecondsを呼ぶ', () => {
        const onSet = vi.fn();
        const { store } = setup(5, onSet);

        fireEvent.click(screen.getByText('00:05'));
        const input = screen.getByRole('sppinbutton') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '15' } });
        fireEvent.blur(input);

        expect(onSet).toHaveBeenCalledWith(15);
        // after commit, edit mode should be canceled
        expect(store.getState().edit.isEditing).toBe(false);
        // display returns to MM:SS
        expect(screen.getByText('00:05')).toBeInTheDocument();
    });

    it('commits on Enter key press', () => {
        const onSet = vi.fn();
        const { store } = setup(20, onSet);
    
        fireEvent.click(screen.getByText('00:20'));
        const input = screen.getByRole('spinbutton') as HTMLInputElement;
    
        fireEvent.change(input, { target: { value: '30' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
        expect(onSet).toHaveBeenCalledWith(30);
        expect(store.getState().edit.isEditing).toBe(false);
        expect(screen.getByText('00:20')).toBeInTheDocument();
      });
    
      it('cancels edit on Escape key press without calling onSetSeconds', () => {
        const onSet = vi.fn();
        const { store } = setup(8, onSet);
    
        fireEvent.click(screen.getByText('00:08'));
        const input = screen.getByRole('spinbutton');
    
        fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
    
        expect(onSet).not.toHaveBeenCalled();
        expect(store.getState().edit.isEditing).toBe(false);
        expect(screen.getByText('00:08')).toBeInTheDocument();
      });
})