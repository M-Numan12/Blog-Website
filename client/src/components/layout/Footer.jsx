import Link from 'next/link';
import { FOOTER_LINKS, NAV_LINKS, SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white border-t border-brand-gold/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Link href="/" className="font-serif text-2xl font-bold text-brand-white">
            Celeb<span className="text-brand-gold">Scope</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-brand-white/75 max-w-sm">
            {SITE_CONFIG.tagline}
          </p>
        </div>

        <div>
          <h2 className="font-serif text-base font-bold text-brand-gold uppercase tracking-wider">
            Sections
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-brand-white/80 hover:text-brand-gold transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-base font-bold text-brand-gold uppercase tracking-wider">
            Publication &amp; Standards
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-brand-white/80 hover:text-brand-gold transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-white/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-white/60">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>Independent English-language celebrity biography &amp; entertainment publication.</p>
        </div>
      </div>
    </footer>
  );
}
