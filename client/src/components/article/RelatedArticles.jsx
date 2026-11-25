import Link from 'next/link';
import { formatEditorialDate } from '@/lib/data';

export default function RelatedArticles({ articles = [] }) {
  if (!articles.length) return null;

  return (
    <aside className="bg-brand-gray border border-black/10 p-6">
      <h2 className="text-xl font-bold border-b border-black/10 pb-3">Related Profiles</h2>
      <ul className="mt-4 divide-y divide-black/10">
        {articles.map((item) => (
          <li key={item._id || item.slug} className="py-4 first:pt-1 last:pb-0">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-brand-gold">
              {item.categoryId?.name || 'Biography'}
            </span>
            <h3 className="mt-1 text-base font-bold leading-snug text-brand-black">
              <Link
                href={`/celebrity/${item.slug}`}
                className="hover:text-brand-gold transition-colors"
              >
                {item.title}
              </Link>
            </h3>
            {item.publishedAt && (
              <time className="block mt-1.5 text-xs text-brand-charcoal/65" dateTime={item.publishedAt}>
                {formatEditorialDate(item.publishedAt)}
              </time>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
