import CategoryListingView from '@/components/article/CategoryListingView';
import { getArticles } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Actors',
  description: 'Verified biographies, filmographies, and career highlights of actors and actresses.',
  path: '/actors',
});

export default async function ActorsPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(parseInt(sp?.page, 10) || 1, 1);
  const { articles, pagination } = await getArticles({ category: 'actors', page, limit: 9 });

  return (
    <CategoryListingView
      title="Actors & Actresses"
      description="Well-researched screen and stage biographies featuring verified filmographies, theatre origins, and major awards."
      articles={articles}
      pagination={pagination}
      basePath="/actors"
    />
  );
}
