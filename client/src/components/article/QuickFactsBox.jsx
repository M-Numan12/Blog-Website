export default function QuickFactsBox({ facts = [] }) {
  if (!facts.length) return null;

  return (
    <aside className="bg-brand-gray border-l-4 border-brand-gold p-5 my-6">
      <h2 className="text-lg font-bold">Quick Facts</h2>
      <dl className="mt-3 divide-y divide-black/10 text-sm">
        {facts.map((fact) => (
          <div key={fact.label} className="py-2 flex justify-between gap-4">
            <dt className="font-semibold text-brand-black">{fact.label}</dt>
            <dd className="text-brand-charcoal text-right">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
