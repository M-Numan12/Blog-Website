import Breadcrumbs from '@/components/article/Breadcrumbs';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Terms of Use',
  description: 'Terms governing use of the CelebScope website and editorial content.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]} />
      <h1 className="text-3xl md:text-5xl font-bold">Terms of Use</h1>
      <p className="mt-2 text-xs text-brand-charcoal/65">Last updated: November 2026</p>

      <div className="editorial-prose mt-8">
        <p>
          By accessing CelebScope, you agree to these Terms of Use. All original editorial writing,
          design elements, and compilations published on this site are protected under applicable
          copyright laws.
        </p>

        <h2>Permitted Use</h2>
        <p>
          You may read, share links to, and quote brief excerpts of CelebScope articles with clear
          attribution. Automated scraping, bulk republication, or commercial redistribution without
          written permission is prohibited.
        </p>

        <h2>Reader Submissions</h2>
        <p>
          Comments and contact submissions must remain lawful, respectful, and free of defamation,
          harassment, or spam. CelebScope moderates all reader comments prior to publication.
        </p>
      </div>
    </article>
  );
}
