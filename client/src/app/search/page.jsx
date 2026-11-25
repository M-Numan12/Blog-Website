export const metadata = {
  title: 'Search',
  description: 'Search celebrity biographies, actors, singers, and entertainment stories.',
};

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const q = params?.q || '';

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold">Search Results</h1>
      <p className="mt-2 text-brand-charcoal/80">
        {q ? `Showing results for "${q}"` : 'Enter a query to search CelebScope.'}
      </p>
    </section>
  );
}
