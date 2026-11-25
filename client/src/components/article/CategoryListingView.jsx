import Link from 'next/link';
import ArticleCard from '@/components/article/ArticleCard';
import Pagination from '@/components/ui/Pagination';
import Breadcrumbs from '@/components/article/Breadcrumbs';

export default function CategoryListingView({
  title,
  description,
  articles = [],
  pagination,
  basePath,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: title }]} />

      <header className="border-b border-black/15 pb-6">
        <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
          CelebScope Archive
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold">{title}</h1>
        {description && (
          <p className="mt-3 text-base text-brand-charcoal/80 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </header>

      {articles.length > 0 ? (
        <>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {articles.map((article) => (
              <ArticleCard key={article._id || article.slug} article={article} />
            ))}
          </div>
          {pagination && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              basePath={basePath}
            />
          )}
        </>
      ) : (
        <div className="mt-12 bg-brand-gray border border-black/10 p-10 text-center">
          <h2 className="text-2xl font-bold">No profiles published here yet</h2>
          <p className="mt-2 text-sm text-brand-charcoal/75">
            Our editorial desk is actively researching new profiles for this section.
          </p>
          <Link
            href="/celebrities"
            className="inline-block mt-6 px-5 py-2.5 bg-brand-black text-brand-white text-sm font-medium hover:bg-brand-charcoal"
          >
            Browse All Celebrities
          </Link>
        </div>
      )}
    </div>
  );
}
