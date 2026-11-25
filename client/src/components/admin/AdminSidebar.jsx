import Link from 'next/link';

const ADMIN_NAV = [
  { label: 'Overview', href: '/admin' },
  { label: 'Articles', href: '/admin/articles' },
  { label: 'New Article', href: '/admin/articles/new' },
  { label: 'Categories', href: '/admin/categories' },
  { label: 'Media Library', href: '/admin/media' },
  { label: 'Comments', href: '/admin/comments' },
  { label: 'Audit Logs', href: '/admin/audit-logs' },
];

export default function AdminSidebar() {
  return (
    <aside className="w-60 bg-brand-black text-brand-white p-6 hidden md:block">
      <p className="font-serif text-xl font-bold text-brand-gold">CelebScope CMS</p>
      <nav aria-label="Admin navigation" className="mt-6 flex flex-col gap-2 text-sm">
        {ADMIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-2 rounded hover:bg-brand-charcoal hover:text-brand-gold transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
