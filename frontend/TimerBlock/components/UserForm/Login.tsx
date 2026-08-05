// ## 🧩 2. React: ログインフォーム（React Hook Form）

// * React Hook Form を使えば、フォームの状態管理やバリデーションがシンプルに行えます。
// * `onSubmit` でバックエンド API に送信します。成功したら認証済みルートへ遷移。

import { useForm } from 'react-hook-form';

export function Login() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const onSubmit = async (data) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data),
    });
    if (res.ok) window.location.href = '/dashboard';
    else alert('Invalid credentials');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('username', { required: true })} placeholder="Username" />
        {errors.username && <span>必須です</span>}
      </div>
      <div>
        <input type="password" {...register('password', { required: true })} placeholder="Password" />
        {errors.password && <span>必須です</span>}
      </div>
      <button type="submit">ログイン</button>
    </form>
  );
}