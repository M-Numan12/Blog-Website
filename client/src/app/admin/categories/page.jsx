'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  async function loadCategories() {
    try {
      const res = await apiFetch('/categories');
      setCategories(res.categories || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    try {
      await apiFetch('/admin/categories', {
        method: 'POST',
        body: JSON.stringify({ name, slug: slug || undefined, description }),
      });
      setName('');
      setSlug('');
      setDescription('');
      loadCategories();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id, catName) {
    if (!window.confirm(`Delete category "${catName}"?`)) return;
    setError('');
    try {
      await apiFetch(`/admin/categories/${id}`, { method: 'DELETE' });
      loadCategories();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Categories</h1>

      {error && <p className="p-3 bg-red-50 border border-red-200 text-sm text-brand-red">{error}</p>}

      <form onSubmit={handleCreate} className="bg-brand-white border border-black/10 p-6 space-y-4">
        <h2 className="text-lg font-bold">Add New Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Category Name (e.g. Directors)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3.5 py-2.5 border border-black/20 text-sm"
          />
          <input
            type="text"
            placeholder="Slug (optional)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="px-3.5 py-2.5 border border-black/20 text-sm"
          />
        </div>
        <textarea
          rows={2}
          placeholder="Short editorial description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3.5 py-2.5 border border-black/20 text-sm"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-brand-black text-brand-white text-sm font-semibold hover:bg-brand-charcoal"
        >
          Create Category
        </button>
      </form>

      <div className="bg-brand-white border border-black/10 divide-y divide-black/10">
        {categories.map((cat) => (
          <div key={cat._id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-brand-black">
                {cat.name}{' '}
                <span className="text-xs font-mono text-brand-charcoal/60">/{cat.slug}</span>
              </p>
              <p className="text-xs text-brand-charcoal/75 mt-1">{cat.description}</p>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(cat._id, cat.name)}
              className="text-xs font-semibold text-brand-red hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
