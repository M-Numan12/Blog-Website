'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function ArticleEditorForm({ initialArticle = null }) {
  const router = useRouter();
  const isEditing = Boolean(initialArticle?._id);

  const [categories, setCategories] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: initialArticle?.title || '',
    slug: initialArticle?.slug || '',
    categoryId: initialArticle?.categoryId?._id || initialArticle?.categoryId || '',
    excerpt: initialArticle?.excerpt || '',
    body: initialArticle?.body || '<h2 id="early-life">Early Life and Education</h2>\n<p></p>\n<h2 id="career-achievements">Career and Achievements</h2>\n<p></p>',
    status: initialArticle?.status || 'draft',
    isFeatured: Boolean(initialArticle?.isFeatured),
    isTrending: Boolean(initialArticle?.isTrending),
    heroImage: {
      url: initialArticle?.heroImage?.url || '/images/editorial-celebrities.svg',
      altText: initialArticle?.heroImage?.altText || '',
      credit: initialArticle?.heroImage?.credit || '',
      caption: initialArticle?.heroImage?.caption || '',
    },
    seoTitle: initialArticle?.seoTitle || '',
    metaDescription: initialArticle?.metaDescription || '',
    canonicalUrl: initialArticle?.canonicalUrl || '',
    socialImage: initialArticle?.socialImage || '',
    tagsText: Array.isArray(initialArticle?.tags) ? initialArticle.tags.join(', ') : '',
    quickFacts: initialArticle?.quickFacts?.length
      ? initialArticle.quickFacts
      : [{ label: 'Profession', value: '' }],
    sources: initialArticle?.sources?.length
      ? initialArticle.sources
      : [{ title: '', url: '' }],
  });

  useEffect(() => {
    apiFetch('/categories')
      .then((res) => {
        setCategories(res.categories || []);
        if (!form.categoryId && res.categories?.length) {
          setForm((prev) => ({ ...prev, categoryId: res.categories[0]._id }));
        }
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      title: form.title,
      slug: form.slug || undefined,
      categoryId: form.categoryId,
      excerpt: form.excerpt,
      body: form.body,
      status: form.status,
      isFeatured: form.isFeatured,
      isTrending: form.isTrending,
      heroImage: form.heroImage,
      seoTitle: form.seoTitle,
      metaDescription: form.metaDescription,
      canonicalUrl: form.canonicalUrl,
      socialImage: form.socialImage,
      tags: form.tagsText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      quickFacts: form.quickFacts.filter((f) => f.label.trim() && f.value.trim()),
      sources: form.sources.filter((s) => s.title.trim() && s.url.trim()),
    };

    try {
      if (isEditing) {
        await apiFetch(`/admin/articles/${initialArticle._id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch('/admin/articles', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      router.push('/admin/articles');
    } catch (err) {
      setError(err.message || 'Failed to save article.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-white border border-black/10 p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-black/10 pb-4">
        <h2 className="text-xl font-bold">{isEditing ? 'Edit Profile' : 'New Profile Draft'}</h2>
        <button
          type="button"
          onClick={() => setPreviewMode((p) => !p)}
          className="px-4 py-1.5 border border-black/20 text-xs font-semibold hover:border-brand-gold"
        >
          {previewMode ? 'Back to Editor' : 'Preview Content'}
        </button>
      </div>

      {error && (
        <div role="alert" className="p-3.5 bg-red-50 border border-red-200 text-sm text-brand-red">
          {error}
        </div>
      )}

      {previewMode ? (
        <div className="p-6 bg-brand-gray border border-black/10">
          <h1 className="text-3xl font-bold">{form.title || 'Untitled Profile'}</h1>
          <p className="mt-2 text-base text-brand-charcoal/80">{form.excerpt}</p>
          <div
            className="editorial-prose mt-6"
            dangerouslySetInnerHTML={{ __html: form.body }}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider">Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2.5 border border-black/20 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider">
                Slug (auto-generated if blank)
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="example-name-biography"
                className="mt-1.5 w-full px-3.5 py-2.5 border border-black/20 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider">Category *</label>
              <select
                required
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2.5 border border-black/20 text-sm bg-brand-white"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider">
                Workflow Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2.5 border border-black/20 text-sm bg-brand-white"
              >
                <option value="draft">Draft</option>
                <option value="review">In Review</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-end gap-5 pb-2 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isTrending}
                  onChange={(e) => setForm({ ...form, isTrending: e.target.checked })}
                />
                <span>Trending</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider">Excerpt *</label>
            <textarea
              rows={2}
              required
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="mt-1.5 w-full px-3.5 py-2.5 border border-black/20 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider">
              Article Body (Structured HTML — sanitized server-side) *
            </label>
            <textarea
              rows={10}
              required
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className="mt-1.5 w-full px-3.5 py-2.5 border border-black/20 text-sm font-mono"
            />
          </div>

          {/* Hero Image Metadata */}
          <fieldset className="border border-black/10 p-4 space-y-4">
            <legend className="text-xs font-semibold uppercase tracking-wider px-2 text-brand-gold">
              Hero Image &amp; Credits
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Image URL"
                value={form.heroImage.url}
                onChange={(e) =>
                  setForm({ ...form, heroImage: { ...form.heroImage, url: e.target.value } })
                }
                className="px-3 py-2 border border-black/20 text-sm"
              />
              <input
                type="text"
                placeholder="Descriptive Alt Text"
                value={form.heroImage.altText}
                onChange={(e) =>
                  setForm({ ...form, heroImage: { ...form.heroImage, altText: e.target.value } })
                }
                className="px-3 py-2 border border-black/20 text-sm"
              />
              <input
                type="text"
                placeholder="Image Credit"
                value={form.heroImage.credit}
                onChange={(e) =>
                  setForm({ ...form, heroImage: { ...form.heroImage, credit: e.target.value } })
                }
                className="px-3 py-2 border border-black/20 text-sm"
              />
              <input
                type="text"
                placeholder="Caption"
                value={form.heroImage.caption}
                onChange={(e) =>
                  setForm({ ...form, heroImage: { ...form.heroImage, caption: e.target.value } })
                }
                className="px-3 py-2 border border-black/20 text-sm"
              />
            </div>
          </fieldset>

          {/* SEO Fields */}
          <fieldset className="border border-black/10 p-4 space-y-4">
            <legend className="text-xs font-semibold uppercase tracking-wider px-2 text-brand-gold">
              SEO &amp; Social Metadata
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="SEO Title"
                value={form.seoTitle}
                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                className="px-3 py-2 border border-black/20 text-sm"
              />
              <input
                type="text"
                placeholder="Canonical URL (optional)"
                value={form.canonicalUrl}
                onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                className="px-3 py-2 border border-black/20 text-sm"
              />
            </div>
            <textarea
              rows={2}
              placeholder="Meta Description"
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              className="w-full px-3 py-2 border border-black/20 text-sm"
            />
            <input
              type="text"
              placeholder="Tags (comma-separated, e.g. actors, oscars, cinema)"
              value={form.tagsText}
              onChange={(e) => setForm({ ...form, tagsText: e.target.value })}
              className="w-full px-3 py-2 border border-black/20 text-sm"
            />
          </fieldset>
        </>
      )}

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/10">
        <button
          type="button"
          onClick={() => router.push('/admin/articles')}
          className="px-5 py-2.5 border border-black/20 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-brand-black text-brand-white text-sm font-semibold hover:bg-brand-charcoal disabled:opacity-60"
        >
          {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Save Article'}
        </button>
      </div>
    </form>
  );
}
