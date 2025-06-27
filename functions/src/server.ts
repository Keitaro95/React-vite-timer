// // server.ts
// // RESTapi処理を書きます

// import { createHonoNodeServer } from '@resolid/react-router-hono/node-server'
// import * as router from '@react-router/dev/server';


// export default await createHonoNodeServer({
//     routesModule: router,
//     getLoadContext() => ({}),
//     configure(honoApp) {
//         honoApp.use('X-Powered-By', 'Hono + React Router')
//         return next()
//     })
//     honoApp.get('/api', (c) => c.json({message: 'Hello from Hono!'}))

import { Hono } from 'hono'
import { createHonoNodeServer } from '@resolid/react-router-hono/node-server'
import * as router from '@react-router/dev/server'
import { api }  from './index'

const app = new Hono()

app.route('/', api);

// app を明示的に渡す
export default await createHonoNodeServer({
  app,
  routesModule: router,
  getLoadContext: () => ({}),
  configure(honoApp) {
    honoApp.get('/api', (c) => c.json({ message: 'Hello from Hono!' }))
  },
})




// import { setCookie, deleteCookie, getCookie } from 'hono/cookie';
// // 仮ユーザーDB（実際はDBを使う）
// const users = new Map<string, { email: string; password: string }>();

// // トークン管理（簡易なセッション方式）
// const sessions = new Map<string, { email: string }>();

// function generateToken() {
//   return Math.random().toString(36).slice(2);
// }

// // ログイン
// app.post('/api/login', async (c) => {
//   const { email, password } = await c.req.json();

//   const user = users.get(email);
//   if (!user || user.password !== password) {
//     return c.text('Invalid credentials', 401);
//   }

//   const token = generateToken();
//   sessions.set(token, { email });

//   setCookie(c, 'session', token, {
//     httpOnly: true,
//     path: '/',
//     maxAge: 60 * 60,
//   });

//   return c.text('Login successful');
// });

// // ユーザー登録
// app.post('/api/register', async (c) => {
//   const { email, password } = await c.req.json();

//   if (users.has(email)) {
//     return c.text('User already exists', 400);
//   }

//   users.set(email, { email, password });

//   return c.text('Registered successfully');
// });

// // セッション確認（例: loader内の getSession から呼び出される想定）
// app.get('/api/session', (c) => {
//   const token = getCookie(c, 'session');
//   if (!token || !sessions.has(token)) {
//     return c.json({ user: null }, 401);
//   }

//   const session = sessions.get(token);
//   return c.json({ user: session });
// });

// // ログアウト
// app.post('/api/logout', (c) => {
//   const token = getCookie(c, 'session');
//   if (token) {
//     sessions.delete(token);
//   }

//   deleteCookie(c, 'session', { path: '/' });

//   return c.text('Logged out');
// });

// // アカウント削除
// app.delete('/api/delete', async (c) => {
//   const token = getCookie(c, 'session');
//   if (!token || !sessions.has(token)) {
//     return c.text('Unauthorized', 401);
//   }

//   const { email } = sessions.get(token)!;
//   users.delete(email);
//   sessions.delete(token);
//   deleteCookie(c, 'session', { path: '/' });

//   return c.text('Account deleted');
// });


