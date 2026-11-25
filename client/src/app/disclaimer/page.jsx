import Link from 'next/link';
import Breadcrumbs from '@/components/article/Breadcrumbs';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Disclaimer & Corrections',
  description: 'Limitations, informational scope, and factual correction procedures at CelebScope.',
  path: '/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Disclaimer' }]} />
      <h1 className="text-3xl md:text-5xl font-bold">Disclaimer &amp; Corrections Policy</h1>

      <div className="editorial-prose mt-8">
        <p>
          All biographies and entertainment features published on CelebScope are provided for
          general informational and educational purposes. While our editorial team verifies facts
          using reputable primary sources, public careers evolve continuously.
        </p>

        <h2>No Speculative Claims</h2>
        <p>
          CelebScope does not publish invasive private details, unverified relationship rumours, or
          fabricated net-worth figures. Where financial or industry figures are cited from reputable
          public filings or established publications, they are explicitly attributed and labeled as
          estimates where applicable.
        </p>

        <h2>Corrections Process</h2>
        <p>
          If you notice an outdated detail or factual error, please report it via our{' '}
          <Link href="/contact">Contact page</Link>. Verified corrections are applied promptly, and
          significant revisions update the article’s displayed &ldquo;Updated&rdquo; date.
        </p>
      </div>
    </article>
  );
}
