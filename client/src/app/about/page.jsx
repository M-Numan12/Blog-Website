import Link from 'next/link';
import Breadcrumbs from '@/components/article/Breadcrumbs';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'About CelebScope',
  description: 'Learn about CelebScope, our independent editorial team, and our commitment to verified public biographies.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">Our Publication</p>
      <h1 className="mt-2 text-3xl md:text-5xl font-bold">About CelebScope</h1>

      <div className="editorial-prose mt-8">
        <p>
          <strong>CelebScope</strong> is an independent English-language editorial publication
          dedicated to clear, well-researched biographies and entertainment features about the
          actors, musicians, creators, and public figures shaping popular culture across the United
          States, United Kingdom, Canada, Australia, and worldwide.
        </p>

        <h2>Our Editorial Mission</h2>
        <p>
          Online celebrity coverage is too often crowded with unverified rumours, recycled gossip,
          and speculative figures. CelebScope takes the opposite approach: every profile prioritizes
          accuracy, verifiable milestones, primary sources, and respectful reporting.
        </p>

        <h2>What Readers Can Expect</h2>
        <ul>
          <li>Verified career timelines, filmographies, discographies, and official honors.</li>
          <li>Clear separation between confirmed facts and public commentary.</li>
          <li>Visible publication and meaningful update dates on every profile.</li>
          <li>Direct pathways to report factual errors or submit primary-source updates.</li>
        </ul>

        <h2>Editorial Desk</h2>
        <p>
          Read our full{' '}
          <Link href="/editorial-policy">Editorial &amp; Sourcing Policy</Link> or reach our team
          directly through our <Link href="/contact">Contact page</Link>.
        </p>
      </div>
    </article>
  );
}
