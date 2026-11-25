'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ArticleEditorForm from '@/components/admin/ArticleEditorForm';
import { apiFetch } from '@/lib/api';

export default function EditArticlePage() {
  const params = useParams();
  const id = params?.id;
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    apiFetch(`/admin/articles/${id}`)
      .then((res) => setArticle(res.article))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p className="p-4 bg-red-50 border border-red-200 text-sm text-brand-red">{error}</p>;
  }

  if (!article) {
    return <p className="text-sm text-brand-charcoal/70">Loading article...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <ArticleEditorForm initialArticle={article} />
    </div>
  );
}
