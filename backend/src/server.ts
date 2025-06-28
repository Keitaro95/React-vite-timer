// // server.ts
// // RESTapi処理を書きます

//  🧰 1. Hono + セッション設定
// * `hono-sessions` によって、サーバー側で Cookie を発行し、セッション情報（ここでは `user`）を保存します 。
// * `/api/session` で現在のログイン状態を返します。
import { Hono } from 'hono';
import { sessionMiddleware, CookieStore } from 'hono-sessions';

const app = new Hono();

app.use('*', sessionMiddleware({
  store: new CookieStore(),
  encryptionKey: '32文字以上の乱数',
  cookieOptions: { httpOnly: true, sameSite: 'lax', path: '/' },
  expireAfterSeconds: 60 * 60 * 24, // 24時間有効
}));

app.post('/api/login', async (c) => {
  const { username, password } = await c.req.parseBody();
  if (username === 'user' && password === 'pass') {
    const sess = c.get('session');
    sess.set('user', { username });
    return c.json({ ok: true });
  }
  return c.json({ ok: false }, 401);
});

app.post('/api/logout', (c) => {
  const sess = c.get('session');
  sess.delete('user');
  return c.json({ ok: true });
});

app.get('/api/session', (c) => {
  const sess = c.get('session');
  return c.json({ user: sess.get('user') || null });
});

export default app;




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


