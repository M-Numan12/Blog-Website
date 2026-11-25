import Link from 'next/link';
import ArticleCard from '@/components/article/ArticleCard';
import SearchBar from '@/components/ui/SearchBar';
import Breadcrumbs from '@/components/article/Breadcrumbs';
import { searchArticles } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Search',
  description: 'Search verified celebrity biographies, actors, singers, and entertainment stories on CelebScope.',
  path: '/search',
});

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const q = (sp?.q || '').trim();
  const { results } = await searchArticles(q);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />

      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold">Search CelebScope</h1>
        <p className="mt-3 text-sm text-brand-charcoal/80">
          Find biographies, actors, singers, creators, and verified career profiles.
        </p>
        <div className="mt-6">
          <SearchBar />
        </div>
      </div>

      {q && (
        <div className="mt-10">
          <p className="text-sm text-brand-charcoal/75 pb-4 border-b border-black/10">
            Showing <strong className="text-brand-black">{results.length}</strong>{' '}
            {results.length === 1 ? 'result' : 'results'} for{' '}
            <strong className="text-brand-black">&ldquo;{q}&rdquo;</strong>
          </p>

          {results.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {results.map((article) => (
                <ArticleCard key={article._id || article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="mt-10 bg-brand-gray border border-black/10 p-10 text-center">
              <h2 className="text-2xl font-bold">No matching profiles found</h2>
              <p className="mt-2 text-sm text-brand-charcoal/80 max-w-md mx-auto">
                Try searching by a performer’s name, profession (such as &ldquo;actor&rdquo; or
                &ldquo;singer&rdquo;), or browse one of our main sections below.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
                <Link href="/actors" className="px-4 py-2 bg-brand-black text-brand-white hover:bg-brand-charcoal">
                  Actors
                </Link>
                <Link href="/singers" className="px-4 py-2 bg-brand-black text-brand-white hover:bg-brand-charcoal">
                  Singers
                </Link>
                <Link href="/influencers" className="px-4 py-2 bg-brand-black text-brand-white hover:bg-brand-charcoal">
                  Influencers
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
