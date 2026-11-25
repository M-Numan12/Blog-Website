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
            className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
                {article.categoryId?.name || 'Biography'}
              </span>
              <h3 className="mt-1 text-lg font-bold text-brand-black">
                <Link
                  href={`/celebrity/${article.slug}`}
                  className="hover:text-brand-gold transition-colors"
                >
                  {article.title}
                </Link>
              </h3>
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
