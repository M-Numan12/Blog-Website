import CategoryListingView from '@/components/article/CategoryListingView';
import { getArticles } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Influencers',
  description: 'Verified biographies and stories about digital creators and influencers.',
  path: '/influencers',
});

export default async function InfluencersPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(parseInt(sp?.page, 10) || 1, 1);
  const { articles, pagination } = await getArticles({ category: 'influencers', page, limit: 9 });

  return (
    <CategoryListingView
      title="Creators & Influencers"
      description="Carefully sourced profiles documenting the backgrounds, studios, and public work of modern digital creators."
      articles={articles}
      pagination={pagination}
      basePath="/influencers"
    />
  );
}
