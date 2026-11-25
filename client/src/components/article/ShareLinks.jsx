'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';

export default function ShareLinks({ title, url }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 border-y border-black/10 text-xs">
      <span className="font-semibold uppercase tracking-widest text-brand-charcoal/70">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 border border-black/15 text-brand-black hover:border-brand-gold hover:text-brand-gold transition-colors"
      >
        X / Twitter
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 border border-black/15 text-brand-black hover:border-brand-gold hover:text-brand-gold transition-colors"
      >
        LinkedIn
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="px-3 py-1.5 border border-black/15 text-brand-black hover:border-brand-gold hover:text-brand-gold transition-colors"
      >
        Email
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-black/15 text-brand-black hover:border-brand-gold hover:text-brand-gold transition-colors"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Link2 className="w-3.5 h-3.5" />}
        <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
      </button>
    </div>
  );
}
