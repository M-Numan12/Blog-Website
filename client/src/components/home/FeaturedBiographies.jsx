import ArticleCard from '@/components/article/ArticleCard';

export default function FeaturedBiographies({ articles = [] }) {
  if (!articles.length) return null;

  return (
    <section className="bg-brand-gray border-y border-black/10 py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-b border-black/10 pb-4">
          <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">Evergreen Profiles</p>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold">Featured Biographies</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-7">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article._id || article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
