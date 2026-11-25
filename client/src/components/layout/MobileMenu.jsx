'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import SearchBar from '@/components/ui/SearchBar';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        className="p-2 text-brand-white hover:text-brand-gold"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-16 bg-brand-black border-b border-brand-gold/30 px-4 py-5 z-50 shadow-xl">
          <div className="mb-4">
            <SearchBar compact />
          </div>
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1 text-base font-medium text-brand-white hover:text-brand-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
