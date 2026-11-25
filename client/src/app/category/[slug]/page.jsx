export default async function CategoryArchivePage({ params }) {
  const { slug } = await params;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold capitalize">{slug.replace(/-/g, ' ')}</h1>
      <p className="mt-2 text-brand-charcoal/80">Category archive page — ready for implementation.</p>
    </section>
  );
}
