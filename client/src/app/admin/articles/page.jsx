'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

const STATUS_FILTERS = ['all', 'draft', 'review', 'scheduled', 'published', 'archived'];

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadArticles(status = statusFilter) {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch(`/admin/articles?status=${status}`);
      setArticles(res.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArticles(statusFilter);
  }, [statusFilter]);

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}" permanently?`)) return;
    try {
      await apiFetch(`/admin/articles/${id}`, { method: 'DELETE' });
      loadArticles(statusFilter);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="mt-1 text-sm text-brand-charcoal/75">
            Workflow: Draft &rarr; Review &rarr; Scheduled / Published &rarr; Archived
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="px-5 py-2.5 bg-brand-black text-brand-white text-sm font-semibold hover:bg-brand-charcoal"
        >
          + New Article
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setStatusFilter(st)}
            className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border ${
              statusFilter === st
                ? 'bg-brand-black text-brand-white border-brand-black'
                : 'bg-brand-white text-brand-charcoal border-black/15 hover:border-brand-gold'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {error && <p className="p-3 bg-red-50 text-sm text-brand-red border border-red-200">{error}</p>}

      <div className="bg-brand-white border border-black/10 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-black text-brand-white text-xs uppercase tracking-wider">
            <tr>
              <th className="p-3.5">Title</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Updated</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-brand-charcoal/70">
                  Loading articles...
                </td>
              </tr>
            ) : articles.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-brand-charcoal/70">
                  No articles match this filter.
                </td>
              </tr>
            ) : (
              articles.map((art) => (
                <tr key={art._id}>
                  <td className="p-3.5 font-medium text-brand-black">{art.title}</td>
                  <td className="p-3.5 text-brand-charcoal/80">{art.categoryId?.name || '—'}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 text-xs uppercase tracking-wider font-semibold bg-brand-gray border border-black/10">
                      {art.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-xs text-brand-charcoal/70">
                    {new Date(art.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="p-3.5 text-right space-x-3">
                    <Link
                      href={`/admin/articles/${art._id}/edit`}
                      className="text-xs font-semibold text-brand-black hover:text-brand-gold"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(art._id, art.title)}
                      className="text-xs font-semibold text-brand-red hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
