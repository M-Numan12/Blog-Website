import CategoryListingView from '@/components/article/CategoryListingView';
import { getArticles } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Celebrities',
  description: 'Explore all verified celebrity biographies and public profiles on CelebScope.',
  path: '/celebrities',
});

export default async function CelebritiesPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(parseInt(sp?.page, 10) || 1, 1);
  const { articles, pagination } = await getArticles({ page, limit: 9 });

  return (
    <CategoryListingView
      title="All Celebrity Profiles"
      description="Comprehensive, primary-sourced biographies of actors, musicians, digital creators, and public figures shaping international culture."
      articles={articles}
      pagination={pagination}
      basePath="/celebrities"
    />
  );
}
