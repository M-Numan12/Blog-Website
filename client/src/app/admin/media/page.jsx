'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminMediaPage() {
  const [media, setMedia] = useState([]);
  const [file, setFile] = useState(null);
  const [altText, setAltText] = useState('');
  const [credit, setCredit] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function loadMedia() {
    try {
      const res = await apiFetch('/admin/media');
      setMedia(res.media || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadMedia();
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', altText);
    formData.append('credit', credit);

    try {
      const res = await fetch(`${API_BASE_URL}/admin/media`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      setFile(null);
      setAltText('');
      setCredit('');
      loadMedia();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Media Library</h1>

      {error && <p className="p-3 bg-red-50 border border-red-200 text-sm text-brand-red">{error}</p>}

      <form onSubmit={handleUpload} className="bg-brand-white border border-black/10 p-6 space-y-4">
        <h2 className="text-lg font-bold">Upload Licensed Image</h2>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          required
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Descriptive Alt Text (required for accessibility)"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="px-3.5 py-2.5 border border-black/20 text-sm"
          />
          <input
            type="text"
            placeholder="Image Credit / License Source"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            className="px-3.5 py-2.5 border border-black/20 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="px-5 py-2.5 bg-brand-black text-brand-white text-sm font-semibold hover:bg-brand-charcoal disabled:opacity-60"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {media.map((item) => (
          <div key={item._id} className="bg-brand-white border border-black/10 overflow-hidden">
            <div className="aspect-[16/9] bg-brand-gray">
              <img src={item.url} alt={item.altText} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 text-xs space-y-1">
              <p className="font-semibold text-brand-black">{item.altText}</p>
              {item.credit && <p className="text-brand-charcoal/70">Credit: {item.credit}</p>}
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(item.url)}
                className="mt-2 inline-block text-brand-gold font-semibold hover:underline"
              >
                Copy URL
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
