// stateが0になったらToastが表示されるかどうか
import { render, screen } from "@testing-library/react";
import Toast from "./Toast";
import userEvent from "@testing-library/user-event";


// timerの状態は 
// runtimer
// timeup
// reducer関数の動きが正常に動作してるかテストする
// Arrange：state更新前の値を取得
const initState = { count: 0, step: 1 }
it("should descrive toast when time is running up", () => {
    // Act：event fire。stateの値が0に
    const newState = timerReducer(initState, { type: 'timeup' });

    // Assertion：examine expected value
    expect(newState).toEqual({ 0 })
})

