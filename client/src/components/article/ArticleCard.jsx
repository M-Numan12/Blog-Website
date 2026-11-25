import Link from 'next/link';
import { formatEditorialDate } from '@/lib/data';

export default function ArticleCard({ article }) {
  if (!article) return null;

  const categoryName = article.categoryId?.name || 'Biography';
  const categorySlug = article.categoryId?.slug || 'celebrities';
  const imageUrl = article.heroImage?.url || '/images/editorial-celebrities.svg';
  const altText = article.heroImage?.altText || article.title;

  return (
    <article className="bg-brand-white border border-black/10 flex flex-col group transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/9] bg-brand-black overflow-hidden">
        <img
          src={imageUrl}
          alt={altText}
          loading="lazy"
          width={800}
          height={450}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 text-xs">
          <Link
            href={`/category/${categorySlug}`}
            className="uppercase tracking-widest font-semibold text-brand-gold hover:underline"
          >
            {categoryName}
          </Link>
          {article.publishedAt && (
            <time dateTime={article.publishedAt} className="text-brand-charcoal/65">
              {formatEditorialDate(article.publishedAt)}
            </time>
          )}
        </div>

        <h3 className="mt-2.5 text-xl font-bold leading-snug text-brand-black">
          <Link
            href={`/celebrity/${article.slug}`}
            className="hover:text-brand-gold transition-colors focus-visible:underline"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-brand-charcoal/80 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-black/5">
          <span className="text-xs text-brand-charcoal/70">
            By {article.authorId?.name || 'CelebScope Desk'}
          </span>
          <Link
            href={`/celebrity/${article.slug}`}
            className="text-xs font-semibold uppercase tracking-wider text-brand-black hover:text-brand-gold"
            aria-label={`Read profile: ${article.title}`}
          >
            Read Profile &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
