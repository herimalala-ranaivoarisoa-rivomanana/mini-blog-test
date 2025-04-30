// pages/login.tsx
import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      alert('Identifiants invalides');
      return;
    }

    const { token } = await res.json();
    localStorage.setItem('auth-token', token);
    router.push('/admin');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4 text-white">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        className="w-full p-2 border"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Se connecter
      </button>
    </form>
  );
};

export default LoginPage;
