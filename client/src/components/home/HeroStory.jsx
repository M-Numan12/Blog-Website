import Link from 'next/link';
import { formatEditorialDate } from '@/lib/data';

export default function HeroStory({ article }) {
  if (!article) return null;

  const categoryName = article.categoryId?.name || 'Featured';
  const categorySlug = article.categoryId?.slug || 'celebrities';
  const imageUrl = article.heroImage?.url || '/images/editorial-actors.svg';

  return (
    <section className="bg-brand-gray border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <div className="aspect-[16/9] bg-brand-black overflow-hidden border border-black/10">
            <img
              src={imageUrl}
              alt={article.heroImage?.altText || article.title}
              width={1200}
              height={675}
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
          </div>
          {article.heroImage?.credit && (
            <p className="mt-2 text-xs text-brand-charcoal/65">
              Credit: {article.heroImage.credit}
            </p>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest">
            <Link
              href={`/category/${categorySlug}`}
              className="font-semibold text-brand-gold hover:underline"
            >
              {categoryName}
            </Link>
            <span className="text-brand-charcoal/40">&bull;</span>
            <span className="text-brand-charcoal/70 font-medium">Featured Story</span>
          </div>

          <h1 className="mt-3 text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.15] text-brand-black">
            <Link
              href={`/celebrity/${article.slug}`}
              className="hover:text-brand-gold transition-colors"
            >
              {article.title}
            </Link>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-brand-charcoal/85">
            {article.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-charcoal/70">
            <span>
              By{' '}
              <Link
                href={`/author/${article.authorId?.slug || 'eleanor-vance'}`}
                className="font-semibold text-brand-black hover:text-brand-gold"
              >
                {article.authorId?.name || 'CelebScope Desk'}
              </Link>
            </span>
            {article.publishedAt && (
              <time dateTime={article.publishedAt}>
                Published {formatEditorialDate(article.publishedAt)}
              </time>
            )}
          </div>

          <div className="mt-7">
            <Link
              href={`/celebrity/${article.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black text-brand-white text-sm font-semibold tracking-wide hover:bg-brand-charcoal transition-colors"
            >
              Read Full Biography <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
