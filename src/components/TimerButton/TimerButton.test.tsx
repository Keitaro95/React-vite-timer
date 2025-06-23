// Buttonがパターンごとに表示が変わるかどうか
import { render, screen } from "@testing-library/react"
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import userEvent from "@testing-library/user-event";
import { TimerDisplay } from "../TimerDisplay/TimerDisplay";


describe("0からカウントする機能", () => {
    describe("Start, Pause, Reset のUIが機能しているか", ()=> {
        test("Start表示", ()=> {
            render(<TimerDisplay />)
            const h2El = screen.getByRole("heading", { name: '' })
            expect(h2El).toBeInTheDocument();
        })
        test("Pause表示", ()=> {
            render(<TimerDisplay />)
            const h2El = screen.getByRole("heading", { name: '' })
            expect(h2El).toBeInTheDocument();
        })
        test("Reset表示", ()=> {
            render(<TimerDisplay />)
            const h2El = screen.getByRole("heading", { name: '' })
            expect(h2El).toBeInTheDocument();
        })
    })
})


describe("タイマー機能", () => {
    describe("Start, Pause, Reset のUIが機能しているか", ()=> {
        test("Start表示", ()=> {
            render(<TimerDisplay />)
            const h2El = screen.getByRole("heading", { name: '' })
            expect(h2El).toBeInTheDocument();
        })
        test("Pause表示", ()=> {
            render(<TimerDisplay />)
            const h2El = screen.getByRole("heading", { name: '' })
            expect(h2El).toBeInTheDocument();
        })
        test("Reset表示", ()=> {
            render(<TimerDisplay />)
            const h2El = screen.getByRole("heading", { name: '' })
            expect(h2El).toBeInTheDocument();
        })
    })
})
