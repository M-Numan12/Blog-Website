import ArticleEditorForm from '@/components/admin/ArticleEditorForm';

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Biography / Article</h1>
      <ArticleEditorForm />
    </div>
  );
}
