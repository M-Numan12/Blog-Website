import { SITE_CONFIG } from './constants';

export function buildPageMetadata({ title, description, path = '/' }) {
  const canonical = `${SITE_CONFIG.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_CONFIG.name,
      type: 'website',
    },
  };
}
