import Breadcrumbs from '@/components/article/Breadcrumbs';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description: 'How CelebScope collects, uses, and protects reader information.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <h1 className="text-3xl md:text-5xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-xs text-brand-charcoal/65">Last updated: November 2026</p>

      <div className="editorial-prose mt-8">
        <p>
          CelebScope respects reader privacy. This policy explains what limited information is
          collected when you visit our website, submit a contact inquiry, or subscribe to our
          editorial newsletter.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>
            <strong>Information you voluntarily provide:</strong> Name, email address, and message
            contents when you use our contact form, comment submission form, or newsletter signup.
          </li>
          <li>
            <strong>Basic technical logs:</strong> Standard server and analytics telemetry (such as
            browser type, referring page, and aggregated traffic metrics) used to maintain site
            security and performance.
          </li>
        </ul>

        <h2>Cookies and Advertising</h2>
        <p>
          We use essential cookies to keep administrative sessions secure and may use third-party
          analytics or advertising partners (such as Google AdSense) subject to applicable consent
          controls in your region. Readers can manage or disable cookies through browser settings.
        </p>

        <h2>Your Rights &amp; Data Requests</h2>
        <p>
          You may request deletion of any contact submission or newsletter email you have provided
          by contacting our team through the Contact page.
        </p>
      </div>
    </article>
  );
}
