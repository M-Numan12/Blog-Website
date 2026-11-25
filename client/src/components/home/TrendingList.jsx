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
            className="flex flex-col sm:flex-row gap-4 p-4 bg-brand-gray border border-black/10 hover:border-brand-gold/50 transition-colors group"
          >
            <Link
              href={`/celebrity/${article.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="sm:w-44 shrink-0 aspect-[16/9] sm:aspect-[4/3] bg-brand-black overflow-hidden relative block"
            >
              <img
                src={article.heroImage?.url || '/images/blog-cillian-murphy.jpg'}
                alt={article.heroImage?.altText || article.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 w-7 h-7 bg-brand-black/90 text-brand-gold font-serif text-sm font-bold flex items-center justify-center">
                {String(index + 1).padStart(2, '0')}
              </span>
            </Link>

            <div className="min-w-0 flex flex-col justify-center">
              <Link
                href={`/category/${article.categoryId?.slug || 'celebrities'}`}
                className="text-[11px] uppercase tracking-widest font-semibold text-brand-gold hover:underline"
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
              <p className="mt-1.5 text-xs leading-relaxed text-brand-charcoal/80 line-clamp-2">
                {article.excerpt}
              </p>
              {article.publishedAt && (
                <time className="block mt-2 text-[11px] text-brand-charcoal/60" dateTime={article.publishedAt}>
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
