export default async function CelebrityArticlePage({ params }) {
  const { slug } = await params;

  return (
    <article className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold capitalize">{slug.replace(/-/g, ' ')}</h1>
      <p className="mt-2 text-brand-charcoal/80">Individual biography &amp; profile article — ready for implementation.</p>
    </article>
  );
}
