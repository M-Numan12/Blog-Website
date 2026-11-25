import Link from 'next/link';

export default function SourcesAndCorrections({ sources = [] }) {
  return (
    <section className="mt-10 pt-6 border-t border-black/10">
      <h2 className="text-xl font-bold">Sources &amp; Corrections</h2>
      {sources.length > 0 && (
        <ul className="mt-3 list-disc list-inside text-sm space-y-1">
          {sources.map((src) => (
            <li key={src.url}>
              <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-gold">
                {src.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-sm text-brand-charcoal/80">
        Spotted an error?{' '}
        <Link href="/contact" className="underline font-medium hover:text-brand-gold">
          Report a correction
        </Link>
        .
      </p>
    </section>
  );
}
