import CategoryListingView from '@/components/article/CategoryListingView';
import { getArticles } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Singers',
  description: 'Verified biographies, discographies, and career milestones of singers and musicians.',
  path: '/singers',
});

export default async function SingersPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(parseInt(sp?.page, 10) || 1, 1);
  const { articles, pagination } = await getArticles({ category: 'singers', page, limit: 9 });

  return (
    <CategoryListingView
      title="Singers & Musicians"
      description="In-depth profiles of vocalists, songwriters, and recording artists with verified discographies and official chart milestones."
      articles={articles}
      pagination={pagination}
      basePath="/singers"
    />
  );
}
