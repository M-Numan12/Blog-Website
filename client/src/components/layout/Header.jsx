import Link from 'next/link';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import SearchBar from '@/components/ui/SearchBar';
import MobileMenu from './MobileMenu';

export default function Header() {
  return (
    <header className="bg-brand-black text-brand-white border-b border-brand-gold/30">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-brand-gold">
          {SITE_CONFIG.name}
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-white/90 hover:text-brand-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block w-56">
          <SearchBar compact />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
