import Link from 'next/link';
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white border-t border-brand-gold/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <Link href="/" className="font-serif text-2xl font-bold text-brand-gold">
            {SITE_CONFIG.name}
          </Link>
          <p className="mt-2 text-sm text-brand-white/70 max-w-md">{SITE_CONFIG.tagline}</p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-white/80 hover:text-brand-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-brand-white/10 py-4 text-center text-xs text-brand-white/60">
        &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  );
}
