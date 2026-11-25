import Link from 'next/link';
import ArticleCard from '@/components/article/ArticleCard';

export default function LatestArticles({ articles = [] }) {
  if (!articles.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex items-end justify-between border-b border-black/15 pb-4">
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">Fresh Reporting</p>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold">Latest Stories</h2>
        </div>
        <Link
          href="/celebrities"
          className="text-sm font-semibold text-brand-black hover:text-brand-gold"
        >
          View All Profiles &rarr;
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {articles.map((article) => (
          <ArticleCard key={article._id || article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
