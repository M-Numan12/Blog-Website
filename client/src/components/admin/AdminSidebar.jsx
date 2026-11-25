'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

const ADMIN_NAV = [
  { label: 'Overview', href: '/admin' },
  { label: 'Articles', href: '/admin/articles' },
  { label: 'New Article', href: '/admin/articles/new' },
  { label: 'Categories', href: '/admin/categories' },
  { label: 'Media Library', href: '/admin/media' },
  { label: 'Comments', href: '/admin/comments' },
  { label: 'Audit Logs', href: '/admin/audit-logs' },
];

export default function AdminSidebar({ user, onLogout }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-brand-black text-brand-white p-6 flex flex-col justify-between min-h-screen">
      <div>
        <Link href="/admin" className="font-serif text-2xl font-bold text-brand-white block">
          Celeb<span className="text-brand-gold">Scope</span>
        </Link>
        <p className="mt-1 text-xs uppercase tracking-widest text-brand-white/60">Editorial CMS</p>

        <nav aria-label="Admin navigation" className="mt-8 flex flex-col gap-1.5 text-sm">
          {ADMIN_NAV.map((item) => {
            const active =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2.5 rounded-sm transition-colors ${
                  active
                    ? 'bg-brand-charcoal text-brand-gold font-semibold border-l-2 border-brand-gold'
                    : 'text-brand-white/85 hover:bg-brand-charcoal hover:text-brand-gold'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-brand-white/10 space-y-3 text-xs">
        {user && (
          <div>
            <p className="font-semibold text-brand-white">{user.name}</p>
            <p className="text-brand-white/60 capitalize">Role: {user.role}</p>
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="text-brand-gold hover:underline">
            View Public Site
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="px-3 py-1.5 border border-brand-white/25 text-brand-white hover:border-brand-gold hover:text-brand-gold"
          >
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}

export function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    let cancelled = false;
    apiFetch('/admin/auth/me')
      .then((res) => {
        if (!cancelled) {
          setUser(res.user);
          setChecking(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setChecking(false);
          router.replace('/admin/login');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isLoginPage, router]);

  async function handleLogout() {
    try {
      await apiFetch('/admin/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
      router.push('/admin/login');
    }
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-brand-gray">{children}</div>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center text-sm text-brand-charcoal">
        Verifying editorial session...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-brand-gray">
      <AdminSidebar user={user} onLogout={handleLogout} />
      <main className="flex-1 p-6 md:p-10 max-w-6xl">{children}</main>
    </div>
  );
}
