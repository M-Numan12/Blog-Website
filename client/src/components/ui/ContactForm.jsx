'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await apiFetch('/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setFeedback({ type: 'success', text: res.message || 'Message sent successfully.' });
      setForm({ name: '', email: '', subject: '', message: '', website: '' });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err.message || 'Unable to send message right now. Please try again shortly.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-gray border border-black/10 p-6 md:p-8 space-y-5">
      {/* Honeypot field for spam bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-brand-black">
            Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1.5 w-full px-3.5 py-2.5 bg-brand-white border border-black/20 text-sm"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-brand-black">
            Email Address <span className="text-brand-red">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1.5 w-full px-3.5 py-2.5 bg-brand-white border border-black/20 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-semibold text-brand-black">
          Subject <span className="text-brand-red">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          required
          placeholder="Correction request, press inquiry, or editorial question"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="mt-1.5 w-full px-3.5 py-2.5 bg-brand-white border border-black/20 text-sm"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-brand-black">
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          placeholder="Include the profile URL and primary source link if reporting a factual correction."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1.5 w-full px-3.5 py-2.5 bg-brand-white border border-black/20 text-sm"
        />
      </div>

      <p className="text-xs text-brand-charcoal/75">
        Information submitted through this form is used solely to review and respond to your inquiry in
        accordance with our{' '}
        <Link href="/privacy-policy" className="underline hover:text-brand-gold">
          Privacy Policy
        </Link>
        .
      </p>

      {feedback && (
        <div
          role="alert"
          className={`p-3.5 text-sm border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-red-50 border-red-300 text-red-900'
          }`}
        >
          {feedback.text}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-3 bg-brand-black text-brand-white text-sm font-semibold hover:bg-brand-charcoal disabled:opacity-60"
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
