import Breadcrumbs from '@/components/article/Breadcrumbs';
import ContactForm from '@/components/ui/ContactForm';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Contact Us',
  description: 'Contact the CelebScope editorial desk for factual corrections, press inquiries, or general feedback.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">Editorial Desk</p>
      <h1 className="mt-2 text-3xl md:text-5xl font-bold">Contact CelebScope</h1>
      <p className="mt-4 text-base text-brand-charcoal/85 leading-relaxed">
        For factual corrections, press releases, licensing questions, or general feedback, please
        use the form below. When requesting a correction, include the profile URL and a credible
        primary reference so our editors can verify and update the record promptly.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-brand-gray border border-black/10 p-5">
          <h2 className="text-base font-bold">Editorial &amp; Corrections</h2>
          <p className="mt-1 text-sm text-brand-charcoal/80">editorial@celebscope.com</p>
        </div>
        <div className="bg-brand-gray border border-black/10 p-5">
          <h2 className="text-base font-bold">Press &amp; Publicity</h2>
          <p className="mt-1 text-sm text-brand-charcoal/80">press@celebscope.com</p>
        </div>
        <div className="bg-brand-gray border border-black/10 p-5">
          <h2 className="text-base font-bold">Rights &amp; Licensing</h2>
          <p className="mt-1 text-sm text-brand-charcoal/80">rights@celebscope.com</p>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}
