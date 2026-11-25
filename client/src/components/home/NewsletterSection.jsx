'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !consent) {
      setStatus({ type: 'error', text: 'Please enter a valid email and confirm consent.' });
      return;
    }
    setStatus({
      type: 'success',
      text: 'Thank you for subscribing to the CelebScope weekly editorial digest.',
    });
    setEmail('');
    setConsent(false);
  }

  return (
    <section className="bg-brand-black text-brand-white py-14">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
          Weekly Editorial Digest
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-brand-white">
          Well-Researched Profiles, Delivered Weekly
        </h2>
        <p className="mt-3 text-sm text-brand-white/75">
          Receive newly published biographies and verified career updates. No gossip, no spam—unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 max-w-lg mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-brand-charcoal border border-brand-white/20 text-sm text-brand-white placeholder:text-brand-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand-gold text-brand-black font-semibold text-sm hover:bg-brand-gold/90 transition-colors"
            >
              Subscribe
            </button>
          </div>

          <label className="flex items-start justify-center gap-2 text-xs text-brand-white/75 text-left cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 accent-brand-gold"
            />
            <span>
              I agree to receive occasional editorial newsletters in accordance with the{' '}
              <Link href="/privacy-policy" className="underline text-brand-gold">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {status && (
            <p
              role="status"
              className={`text-xs font-medium ${
                status.type === 'success' ? 'text-brand-gold' : 'text-red-400'
              }`}
            >
              {status.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
