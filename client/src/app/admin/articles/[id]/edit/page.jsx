export default async function EditArticlePage({ params }) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold">Edit Article</h1>
      <p className="mt-2 text-brand-charcoal/80">Editing article ID: {id}</p>
    </div>
  );
}
