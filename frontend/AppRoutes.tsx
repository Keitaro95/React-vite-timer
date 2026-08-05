// この中にルーティングを書く
// main.tsxで全部集約したDOMをレンダリングするから
// ここでコンポーネントのルーティングをして表示を管理する
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TimerPage  from './components/pages/Page';
import { HealthReport } from './components/HealthData/HealthReport';
import './App.css'

const routes = [
  {
    path: '/timer',
    Component: TimerPage
  },
  {
    path: '/healthdata',
    Component: HealthReport
  },
] as const;

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/healthdata" element={<HealthReport />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;



