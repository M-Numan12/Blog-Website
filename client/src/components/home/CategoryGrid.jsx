import Link from 'next/link';

export default function CategoryGrid({ categories = [] }) {
  if (!categories.length) return null;

  return (
    <section className="bg-brand-gray border-y border-black/10 py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-black/10">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">Browse by Desk</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-bold">Popular Categories</h2>
          </div>
          <p className="text-sm text-brand-charcoal/75">
            Focused editorial desks built around verified profiles and primary sources.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat._id || cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-brand-white border border-black/10 p-5 flex flex-col justify-between hover:border-brand-gold transition-colors group"
            >
              <div>
                <h3 className="text-lg font-bold text-brand-black group-hover:text-brand-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-brand-charcoal/75 line-clamp-3">
                  {cat.description}
                </p>
              </div>
              <span className="mt-4 pt-3 border-t border-black/5 text-xs font-semibold text-brand-black flex items-center justify-between">
                <span>{cat.articleCount ?? 0} profiles</span>
                <span className="text-brand-gold" aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
