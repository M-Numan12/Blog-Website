'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/admin/stats')
      .then((res) => setStats(res.stats))
      .catch((err) => setError(err.message));
  }, []);

  const cards = [
    { label: 'Published Profiles', value: stats?.publishedArticles ?? '—' },
    { label: 'Drafts', value: stats?.draftArticles ?? '—' },
    { label: 'Awaiting Review', value: stats?.inReviewArticles ?? '—' },
    { label: 'Categories', value: stats?.categories ?? '—' },
    { label: 'Pending Comments', value: stats?.pendingComments ?? '—' },
    { label: 'Media Assets', value: stats?.mediaAssets ?? '—' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">Overview</p>
          <h1 className="mt-1 text-3xl font-bold">Editorial Dashboard</h1>
        </div>
        <Link
          href="/admin/articles/new"
          className="px-5 py-2.5 bg-brand-black text-brand-white text-sm font-semibold hover:bg-brand-charcoal"
        >
          + Create New Profile
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-sm text-brand-red">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => (
          <div key={card.label} className="bg-brand-white border border-black/10 p-6">
            <p className="text-xs uppercase tracking-wider text-brand-charcoal/70">{card.label}</p>
            <p className="mt-2 font-serif text-4xl font-bold text-brand-black">{card.value}</p>
          </div>
        ))}
      </div>

      <section className="bg-brand-white border border-black/10 p-6">
        <h2 className="text-xl font-bold">Search &amp; Analytics Dashboards</h2>
        <p className="mt-1 text-sm text-brand-charcoal/75">
          External links for monitoring indexing, search queries, and performance without exposing credentials in the client.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-black/20 hover:border-brand-gold hover:text-brand-gold"
          >
            Google Search Console &rarr;
          </a>
          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-black/20 hover:border-brand-gold hover:text-brand-gold"
          >
            Google Analytics &rarr;
          </a>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-black/20 hover:border-brand-gold hover:text-brand-gold"
          >
            Inspect XML Sitemap &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
