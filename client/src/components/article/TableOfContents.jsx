export default function TableOfContents({ headings = [] }) {
  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents" className="bg-brand-gray p-4 mb-6 text-sm">
      <h2 className="font-serif text-base font-bold">In This Profile</h2>
      <ul className="mt-2 space-y-1.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="text-brand-charcoal hover:text-brand-gold">
              {h.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
