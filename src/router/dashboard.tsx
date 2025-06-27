import { Outlet } from "react-router";

export default function Dashboard() {
    return (
        <div>
            <h1>ダッシュボード</h1>
            <Outlet />
        </div>
    )
}