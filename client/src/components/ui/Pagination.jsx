import Link from 'next/link';

export default function Pagination({ page = 1, totalPages = 1, basePath = '/celebrities' }) {
  if (totalPages <= 1) return null;

  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-3 text-sm">
      {prevPage ? (
        <Link
          href={`${basePath}?page=${prevPage}`}
          className="px-4 py-2 border border-black/20 text-brand-black hover:border-brand-gold hover:text-brand-gold"
        >
          &larr; Previous
        </Link>
      ) : (
        <span className="px-4 py-2 border border-black/10 text-brand-charcoal/40 cursor-not-allowed">
          &larr; Previous
        </span>
      )}

      <span className="px-3 py-2 text-brand-charcoal/80 font-medium">
        Page {page} of {totalPages}
      </span>

      {nextPage ? (
        <Link
          href={`${basePath}?page=${nextPage}`}
          className="px-4 py-2 border border-black/20 text-brand-black hover:border-brand-gold hover:text-brand-gold"
        >
          Next &rarr;
        </Link>
      ) : (
        <span className="px-4 py-2 border border-black/10 text-brand-charcoal/40 cursor-not-allowed">
          Next &rarr;
        </span>
      )}
    </nav>
  );
}
