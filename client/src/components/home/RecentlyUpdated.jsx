import Link from 'next/link';
import { formatEditorialDate } from '@/lib/data';

export default function RecentlyUpdated({ articles = [] }) {
  if (!articles.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="border-b border-black/15 pb-4">
        <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">Verified Updates</p>
        <h2 className="mt-1 text-2xl md:text-3xl font-bold">Recently Updated Profiles</h2>
      </div>

      <div className="mt-6 divide-y divide-black/10">
        {articles.slice(0, 4).map((article) => (
          <div
            key={article._id || article.slug}
            className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-4 min-w-0">
              <Link
                href={`/celebrity/${article.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className="w-24 aspect-[16/9] bg-brand-black overflow-hidden shrink-0 hidden sm:block"
              >
                <img
                  src={article.heroImage?.url || '/images/blog-cillian-murphy.jpg'}
                  alt={article.heroImage?.altText || article.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="min-w-0">
                <span className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
                  {article.categoryId?.name || 'Biography'}
                </span>
                <h3 className="mt-1 text-lg font-bold text-brand-black truncate">
                  <Link
                    href={`/celebrity/${article.slug}`}
                    className="hover:text-brand-gold transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
              </div>
            </div>

            <div className="shrink-0 text-xs text-brand-charcoal/70 sm:text-right">
              <span className="font-semibold text-brand-black">Updated: </span>
              <time dateTime={article.updatedAt || article.publishedAt}>
                {formatEditorialDate(article.updatedAt || article.publishedAt)}
              </time>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
