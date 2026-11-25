import CategoryListingView from '@/components/article/CategoryListingView';
import { getArticles, getCategories } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug);
  const name = cat?.name || slug.replace(/-/g, ' ');

  return buildPageMetadata({
    title: name,
    description: cat?.description || `Explore verified ${name} profiles on CelebScope.`,
    path: `/category/${slug}`,
  });
}

export default async function CategoryArchivePage({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Math.max(parseInt(sp?.page, 10) || 1, 1);

  const [categories, { articles, pagination }] = await Promise.all([
    getCategories(),
    getArticles({ category: slug, page, limit: 9 }),
  ]);

  const category = categories.find((c) => c.slug === slug);
  const title = category?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <CategoryListingView
      title={title}
      description={
        category?.description || `Verified profiles and editorial features filed under ${title}.`
      }
      articles={articles}
      pagination={pagination}
      basePath={`/category/${slug}`}
    />
  );
}
