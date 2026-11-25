export default function ShareLinks({ title }) {
  return (
    <div className="flex items-center gap-3 text-xs text-brand-charcoal/70 my-4">
      <span className="font-semibold uppercase tracking-wider">Share:</span>
      <span>{title ? `Share "${title}"` : 'Share links placeholder'}</span>
    </div>
  );
}
