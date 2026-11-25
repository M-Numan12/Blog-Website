'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  async function loadComments() {
    try {
      const res = await apiFetch('/admin/comments');
      setComments(res.comments || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadComments();
  }, []);

  async function updateStatus(id, status) {
    try {
      await apiFetch(`/admin/comments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      loadComments();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Comment Moderation</h1>
      {error && <p className="p-3 bg-red-50 border border-red-200 text-sm text-brand-red">{error}</p>}

      <div className="bg-brand-white border border-black/10 divide-y divide-black/10">
        {comments.length === 0 ? (
          <p className="p-6 text-sm text-brand-charcoal/70">No reader comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-brand-charcoal/70">
                  <strong className="text-brand-black">{comment.displayName}</strong> on{' '}
                  <span className="italic">{comment.articleId?.title || 'Article'}</span> &bull;{' '}
                  <span className="uppercase font-semibold">{comment.status}</span>
                </p>
                <p className="mt-1.5 text-sm text-brand-charcoal">{comment.body}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-xs">
                <button
                  type="button"
                  onClick={() => updateStatus(comment._id, 'approved')}
                  className="px-3 py-1.5 bg-brand-black text-brand-white hover:bg-brand-charcoal"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(comment._id, 'rejected')}
                  className="px-3 py-1.5 border border-brand-red text-brand-red hover:bg-red-50"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
