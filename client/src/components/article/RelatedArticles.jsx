import Link from 'next/link';
import { formatEditorialDate } from '@/lib/data';

export default function RelatedArticles({ articles = [] }) {
  if (!articles.length) return null;

  return (
    <aside className="bg-brand-gray border border-black/10 p-6">
      <h2 className="text-xl font-bold border-b border-black/10 pb-3">Related Profiles</h2>
      <ul className="mt-4 divide-y divide-black/10">
        {articles.map((item) => (
          <li key={item._id || item.slug} className="py-4 first:pt-1 last:pb-0 flex gap-3.5 items-start group">
            <Link
              href={`/celebrity/${item.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="w-20 aspect-[4/3] bg-brand-black overflow-hidden shrink-0 block mt-0.5"
            >
              <img
                src={item.heroImage?.url || '/images/blog-cillian-murphy.jpg'}
                alt={item.heroImage?.altText || item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="min-w-0">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-brand-gold">
                {item.categoryId?.name || 'Biography'}
              </span>
              <h3 className="mt-1 text-sm font-bold leading-snug text-brand-black">
                <Link
                  href={`/celebrity/${item.slug}`}
                  className="hover:text-brand-gold transition-colors"
                >
                  {item.title}
                </Link>
              </h3>
              {item.publishedAt && (
                <time className="block mt-1 text-[11px] text-brand-charcoal/65" dateTime={item.publishedAt}>
                  {formatEditorialDate(item.publishedAt)}
                </time>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
