import { MOCK_ARTICLES, MOCK_AUTHORS, MOCK_CATEGORIES } from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function safeServerFetch(path) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1800);
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export function formatEditorialDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function extractHeadingsFromHtml(html = '') {
  const regex = /<h2[^>]*id="([^"]+)"[^>]*>(.*?)<\/h2>/gi;
  const headings = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      id: match[1],
      label: match[2].replace(/<[^>]+>/g, '').trim(),
    });
  }
  return headings;
}

export async function getArticles({
  category,
  featured,
  trending,
  sort,
  page = 1,
  limit = 12,
} = {}) {
  const params = new URLSearchParams();
  if (category && category !== 'celebrities') params.set('category', category);
  if (featured) params.set('featured', 'true');
  if (trending) params.set('trending', 'true');
  if (sort) params.set('sort', sort);
  params.set('page', String(page));
  params.set('limit', String(limit));

  const live = await safeServerFetch(`/articles?${params.toString()}`);
  if (live && Array.isArray(live.articles) && live.articles.length > 0) {
    return live;
  }

  let list = [...MOCK_ARTICLES];
  if (category && category !== 'celebrities') {
    list = list.filter((a) => a.categoryId?.slug === category);
  }
  if (featured) list = list.filter((a) => a.isFeatured);
  if (trending) list = list.filter((a) => a.isTrending);

  list.sort((a, b) => {
    const key = sort === 'updated' ? 'updatedAt' : 'publishedAt';
    return new Date(b[key] || 0) - new Date(a[key] || 0);
  });

  const total = list.length;
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  const start = (page - 1) * limit;
  const paged = list.slice(start, start + limit);

  return {
    articles: paged,
    pagination: { page, limit, total, totalPages },
  };
}

export async function getCategories() {
  const live = await safeServerFetch('/categories');
  if (live && Array.isArray(live.categories) && live.categories.length > 0) {
    return live.categories;
  }
  return MOCK_CATEGORIES;
}

export async function getArticleBySlug(slug) {
  const live = await safeServerFetch(`/articles/${encodeURIComponent(slug)}`);
  if (live && live.article) {
    return live;
  }

  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  if (!article) return null;

  const related = MOCK_ARTICLES.filter(
    (a) => a.slug !== slug && (a.categoryId?.slug === article.categoryId?.slug || a.isFeatured)
  ).slice(0, 4);

  return { article, related, comments: [] };
}

export async function searchArticles(query = '') {
  const trimmed = query.trim();
  if (!trimmed) return { query: '', results: [] };

  const live = await safeServerFetch(`/search?q=${encodeURIComponent(trimmed)}`);
  if (live && Array.isArray(live.results)) {
    return live;
  }

  const lower = trimmed.toLowerCase();
  const results = MOCK_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(lower) ||
      a.excerpt.toLowerCase().includes(lower) ||
      a.body.toLowerCase().includes(lower) ||
      a.tags.some((t) => t.toLowerCase().includes(lower))
  );

  return { query: trimmed, results };
}

export async function getAuthorBySlug(slug) {
  const live = await safeServerFetch(`/authors/${encodeURIComponent(slug)}`);
  if (live && live.author) {
    return live;
  }

  const author = MOCK_AUTHORS.find((u) => u.slug === slug);
  if (!author) return null;

  const articles = MOCK_ARTICLES.filter((a) => a.authorId?.slug === slug);
  return { author, articles };
}
