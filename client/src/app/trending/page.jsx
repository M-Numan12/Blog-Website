import CategoryListingView from '@/components/article/CategoryListingView';
import { getArticles } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Trending Stories',
  description: 'Currently popular and timely verified entertainment stories on CelebScope.',
  path: '/trending',
});

export default async function TrendingPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(parseInt(sp?.page, 10) || 1, 1);
  const { articles, pagination } = await getArticles({ trending: true, page, limit: 9 });

  return (
    <CategoryListingView
      title="Trending Stories"
      description="Timely profiles and entertainment stories highlighted by reader interest and editorial relevance."
      articles={articles}
      pagination={pagination}
      basePath="/trending"
    />
  );
}
