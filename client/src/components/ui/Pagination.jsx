export default function Pagination({ page = 1, totalPages = 1 }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-4 text-sm">
      <span>
        Page {page} of {totalPages}
      </span>
    </nav>
  );
}
