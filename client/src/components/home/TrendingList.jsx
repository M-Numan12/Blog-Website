import Link from 'next/link';
import { formatEditorialDate } from '@/lib/data';

export default function TrendingList({ articles = [] }) {
  if (!articles.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex items-end justify-between border-b border-black/15 pb-4">
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">Editor’s Selection</p>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold">Trending Stories</h2>
        </div>
        <Link href="/trending" className="text-sm font-semibold text-brand-black hover:text-brand-gold">
          All Trending &rarr;
        </Link>
      </div>

      <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <li
            key={article._id || article.slug}
            className="flex gap-5 p-5 bg-brand-gray border border-black/10"
          >
            <span className="font-serif text-3xl font-bold text-brand-gold leading-none select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <Link
                href={`/category/${article.categoryId?.slug || 'celebrities'}`}
                className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal/70 hover:text-brand-gold"
              >
                {article.categoryId?.name || 'Biography'}
              </Link>
              <h3 className="mt-1 text-lg font-bold leading-snug text-brand-black">
                <Link
                  href={`/celebrity/${article.slug}`}
                  className="hover:text-brand-gold transition-colors"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="mt-1.5 text-sm text-brand-charcoal/80 line-clamp-2">{article.excerpt}</p>
              {article.publishedAt && (
                <time className="block mt-2 text-xs text-brand-charcoal/60" dateTime={article.publishedAt}>
                  {formatEditorialDate(article.publishedAt)}
                </time>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
