'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function CommentsSection({ slug, initialComments = [] }) {
  const [displayName, setDisplayName] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await apiFetch(`/articles/${encodeURIComponent(slug)}/comments`, {
        method: 'POST',
        body: JSON.stringify({ displayName, body }),
      });
      setFeedback({ type: 'success', text: res.message || 'Submitted for editorial moderation.' });
      setDisplayName('');
      setBody('');
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err.message || 'Unable to submit comment right now.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-12 pt-8 border-t border-black/10">
      <h2 className="text-2xl font-bold">Reader Discussion ({initialComments.length})</h2>

      {initialComments.length > 0 ? (
        <ul className="mt-5 space-y-4">
          {initialComments.map((comment) => (
            <li key={comment._id} className="bg-brand-gray border border-black/10 p-4">
              <div className="flex items-center justify-between text-xs text-brand-charcoal/70">
                <span className="font-semibold text-brand-black">{comment.displayName}</span>
                <time dateTime={comment.createdAt}>
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <p className="mt-2 text-sm text-brand-charcoal/90 leading-relaxed">{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-brand-charcoal/75">
          No published comments yet. Share a respectful note or verified insight below.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 bg-brand-gray border border-black/10 p-5 space-y-4">
        <h3 className="text-base font-bold">Leave a Comment</h3>
        <p className="text-xs text-brand-charcoal/70">
          All reader comments are reviewed by our editorial moderators before appearing publicly.
        </p>

        <div>
          <label htmlFor="comment-name" className="block text-xs font-semibold text-brand-black">
            Your Name
          </label>
          <input
            id="comment-name"
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 w-full px-3 py-2 bg-brand-white border border-black/20 text-sm"
          />
        </div>

        <div>
          <label htmlFor="comment-body" className="block text-xs font-semibold text-brand-black">
            Comment
          </label>
          <textarea
            id="comment-body"
            rows={3}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 w-full px-3 py-2 bg-brand-white border border-black/20 text-sm"
          />
        </div>

        {feedback && (
          <p
            role="status"
            className={`text-xs font-medium ${
              feedback.type === 'success' ? 'text-emerald-800' : 'text-brand-red'
            }`}
          >
            {feedback.text}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 bg-brand-black text-brand-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-charcoal disabled:opacity-60"
        >
          {submitting ? 'Submitting...' : 'Post Comment'}
        </button>
      </form>
    </section>
  );
}
