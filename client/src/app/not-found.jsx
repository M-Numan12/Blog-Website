import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-sm uppercase tracking-widest text-brand-gold font-semibold">404</p>
      <h1 className="mt-3 text-4xl font-bold">Page Not Found</h1>
      <p className="mt-4 text-brand-charcoal/80">
        The biography or story you are looking for could not be found.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-brand-black text-brand-white text-sm font-medium hover:bg-brand-charcoal"
        >
          Back to Homepage
        </Link>
        <Link
          href="/search"
          className="px-6 py-3 border border-brand-black text-brand-black text-sm font-medium hover:bg-brand-gray"
        >
          Search Profiles
        </Link>
      </div>
    </section>
  );
}
