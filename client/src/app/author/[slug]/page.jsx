import { notFound } from 'next/navigation';
import ArticleCard from '@/components/article/ArticleCard';
import Breadcrumbs from '@/components/article/Breadcrumbs';
import { getAuthorBySlug } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getAuthorBySlug(slug);
  if (!data) return { title: 'Author Not Found' };
  return buildPageMetadata({
    title: `${data.author.name} — Author Archive`,
    description: data.author.bio || `Published biographies and stories by ${data.author.name} on CelebScope.`,
    path: `/author/${slug}`,
  });
}

export default async function AuthorArchivePage({ params }) {
  const { slug } = await params;
  const data = await getAuthorBySlug(slug);
  if (!data) notFound();

  const { author, articles } = data;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: author.name }]} />

      <header className="bg-brand-gray border border-black/10 p-8">
        <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
          {author.role || 'Editorial Contributor'}
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold">{author.name}</h1>
        {author.bio && (
          <p className="mt-3 text-base text-brand-charcoal/85 max-w-3xl leading-relaxed">
            {author.bio}
          </p>
        )}
      </header>

      <div className="mt-10">
        <h2 className="text-2xl font-bold pb-3 border-b border-black/10">
          Published Profiles ({articles.length})
        </h2>
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {articles.map((article) => (
            <ArticleCard key={article._id || article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
