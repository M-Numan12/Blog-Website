import Link from 'next/link';

export default function ArticleCard({ article }) {
  if (!article) return null;

  return (
    <article className="bg-brand-white border border-black/10 overflow-hidden flex flex-col">
      <div className="aspect-[16/9] bg-brand-gray" />
      <div className="p-5 flex-1 flex flex-col">
        <span className="text-xs uppercase tracking-wider font-semibold text-brand-gold">
          {article.category}
        </span>
        <h3 className="mt-2 text-xl font-bold leading-snug">
          <Link href={`/celebrity/${article.slug}`} className="hover:text-brand-gold transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-brand-charcoal/80 line-clamp-2">{article.excerpt}</p>
        <time className="mt-auto pt-4 text-xs text-brand-charcoal/60">{article.publishedAt}</time>
      </div>
    </article>
  );
}
