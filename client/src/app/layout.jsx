import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/components/layout/SiteChrome';
import { SITE_CONFIG } from '@/lib/constants';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: {
    default: `${SITE_CONFIG.name} — Celebrity Biographies & Entertainment Editorial`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
