import { SITE_CONFIG } from '@/lib/constants';
import { getArticles, getCategories } from '@/lib/data';

export default async function sitemap() {
  const staticRoutes = [
    '',
    '/celebrities',
    '/actors',
    '/singers',
    '/influencers',
    '/trending',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/editorial-policy',
  ].map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date(),
  }));

  const [{ articles }, categories] = await Promise.all([
    getArticles({ limit: 50 }),
    getCategories(),
  ]);

  const articleRoutes = articles.map((article) => ({
    url: `${SITE_CONFIG.url}/celebrity/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt || Date.now()),
  }));

  const categoryRoutes = categories.map((cat) => ({
    url: `${SITE_CONFIG.url}/category/${cat.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
