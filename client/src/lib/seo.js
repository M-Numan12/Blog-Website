import { SITE_CONFIG } from './constants';

export function buildPageMetadata({ title, description, path = '/', image, type = 'website' }) {
  const canonical = `${SITE_CONFIG.url}${path}`;
  const ogImages = image ? [{ url: image, alt: title }] : [];

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_CONFIG.name,
      type,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export function buildArticleJsonLd(article) {
  const url = `${SITE_CONFIG.url}/celebrity/${article.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: article.heroImage?.url ? [`${SITE_CONFIG.url}${article.heroImage.url.startsWith('/') ? article.heroImage.url : ''}`] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Person',
      name: article.authorId?.name || 'CelebScope Editorial',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
  };
}
