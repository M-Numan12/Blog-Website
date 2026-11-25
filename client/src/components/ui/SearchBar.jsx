'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar({ compact = false }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="relative">
      <label htmlFor={compact ? 'header-search' : 'page-search'} className="sr-only">
        Search biographies
      </label>
      <input
        id={compact ? 'header-search' : 'page-search'}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search profiles..."
        className={`w-full pr-9 pl-3 py-1.5 text-sm rounded-sm ${
          compact
            ? 'bg-brand-charcoal text-brand-white placeholder:text-brand-white/60 border border-brand-white/20'
            : 'bg-brand-white text-brand-black border border-black/20 py-2.5'
        }`}
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-gold"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}
