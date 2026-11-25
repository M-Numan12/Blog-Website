import Link from 'next/link';
import { formatEditorialDate } from '@/lib/data';

export default function ArticleCard({ article }) {
  if (!article) return null;

  const categoryName = article.categoryId?.name || 'Biography';
  const categorySlug = article.categoryId?.slug || 'celebrities';
  const imageUrl = article.heroImage?.url || '/images/blog-cillian-murphy.jpg';
  const altText = article.heroImage?.altText || article.title;

  return (
    <article className="bg-brand-white border border-black/10 flex flex-col group transition-all duration-300 hover:shadow-xl hover:border-brand-gold/50">
      <Link
        href={`/celebrity/${article.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative aspect-[16/9] bg-brand-black overflow-hidden block"
      >
        <img
          src={imageUrl}
          alt={altText}
          loading="lazy"
          width={800}
          height={450}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand-black/85 text-brand-gold text-[10px] uppercase tracking-widest font-semibold backdrop-blur-sm">
          {categoryName}
        </span>
      </Link>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 text-xs text-brand-charcoal/65">
          {article.publishedAt && (
            <time dateTime={article.publishedAt}>
              {formatEditorialDate(article.publishedAt)}
            </time>
          )}
          {article.readTime && (
            <span className="font-medium text-brand-charcoal/70">{article.readTime}</span>
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

        <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/80 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-5 flex items-center justify-between border-t border-black/5">
          <Link
            href={`/author/${article.authorId?.slug || 'eleanor-vance'}`}
            className="text-xs text-brand-charcoal/75 hover:text-brand-gold"
          >
            By <span className="font-medium text-brand-black">{article.authorId?.name || 'CelebScope Desk'}</span>
          </Link>
          <Link
            href={`/celebrity/${article.slug}`}
            className="text-xs font-semibold uppercase tracking-wider text-brand-black group-hover:text-brand-gold transition-colors"
            aria-label={`Read profile: ${article.title}`}
          >
            Read &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
