import { SITE_CONFIG } from '@/lib/constants';

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
  ];

  // TODO: Append published celebrity profiles and categories dynamically from API
  return staticRoutes.map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date(),
  }));
}
