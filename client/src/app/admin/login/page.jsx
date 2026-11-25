'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiFetch('/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Sign in failed. Check your credentials and server connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-brand-white border border-black/15 p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
          Protected Area
        </p>
        <h1 className="mt-2 text-3xl font-bold">CelebScope Editorial Login</h1>
        <p className="mt-2 text-sm text-brand-charcoal/75">
          Sign in with an authorized Admin, Editor, or Author account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-semibold text-brand-black">
              Email Address
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@celebscope.com"
              className="mt-1.5 w-full px-3.5 py-2.5 border border-black/20 text-sm"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold text-brand-black">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full px-3.5 py-2.5 border border-black/20 text-sm"
            />
          </div>

          {error && (
            <p role="alert" className="p-3 text-xs bg-red-50 border border-red-200 text-brand-red">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-black text-brand-white text-sm font-semibold hover:bg-brand-charcoal disabled:opacity-60"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-black/10 text-center">
          <Link href="/" className="text-xs text-brand-charcoal/70 hover:text-brand-gold">
            &larr; Return to CelebScope Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
