// router.tsx：画面表示を司るrouter。パスによって表示を変えるために存在します。

import { RouteObject } from 'react-router-dom';
import { main } from '../main';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../pages/Dashboard';
import Logout from '../components/Logout';
import DeleteUser from '../components/DeleteUser';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <main />, // 共通レイアウト（ナビゲーションなど）
    children: [
      { index: true, element: <Login /> }, // "/"
      { path: 'register', element: <Register /> }, // "/register"
      {
        path: 'dashboard',
        loader: async ({ context }) => {
          const session = await context.getSession();
          if (!session?.user) {
            throw new Response(null, {
              status: 302,
              headers: { Location: '/' },
            });
          }
          return session;
        },
        element: <Dashboard />,
      },
      {
        path: 'logout',
        loader: async () => {
          await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',
          });
          return new Response(null, {
            status: 302,
            headers: { Location: '/' },
          });
        },
        element: <Logout />, // ログアウト処理中表示など
      },
      {
        path: 'delete-account',
        loader: async ({ context }) => {
          const session = await context.getSession();
          if (!session?.user) {
            throw new Response(null, {
              status: 302,
              headers: { Location: '/' },
            });
          }
          return session;
        },
        element: <DeleteUser />, // ユーザー削除確認ページ
      },
    ],
  },
];
