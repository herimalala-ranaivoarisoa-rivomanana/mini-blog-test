// pages/admin.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AdminPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const { message } = await res.json();
        alert(`Erreur : ${message}`);
        return;
      }

      alert('Article créé avec succès');
      setForm({ title: '', description: '', content: '', image: '' });
    } catch (err) {
      console.error(err);
      alert('Erreur de réseau');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Créer un article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre"
          className="w-full border p-2"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description courte"
          className="w-full border p-2"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Contenu"
          className="w-full border p-2"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL de l’image"
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Publier
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
