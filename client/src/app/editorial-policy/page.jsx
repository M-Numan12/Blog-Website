import Link from 'next/link';
import Breadcrumbs from '@/components/article/Breadcrumbs';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Editorial Policy',
  description: 'CelebScope standards for primary sourcing, fact-checking, image rights, corrections, and AI assistance.',
  path: '/editorial-policy',
});

export default function EditorialPolicyPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Editorial Policy' }]} />
      <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
        Standards &amp; Ethics
      </p>
      <h1 className="mt-2 text-3xl md:text-5xl font-bold">Editorial &amp; Sourcing Policy</h1>

      <div className="editorial-prose mt-8">
        <p>
          Trust is the foundation of CelebScope. Every biography and entertainment article goes
          through structured editorial review prior to publication.
        </p>

        <h2>1. Primary Sourcing</h2>
        <p>
          We prioritize reputable primary sources: official websites, verified interviews, award
          body archives (such as AMPAS, BAFTA, the Recording Academy, and the Television Academy),
          studio press notes, and established newsrooms.
        </p>

        <h2>2. Privacy, Copyright &amp; Image Rights</h2>
        <p>
          We publish only licensed, permissioned, or original editorial artwork with meaningful alt
          text and proper image credits. We respect personal privacy and avoid intrusive coverage of
          non-public family members.
        </p>

        <h2>3. Responsible Use of AI Assistance</h2>
        <p>
          Editorial tools may assist with research organization or outline drafting, but AI is never
          a substitute for human verification, primary-source checking, and independent editorial
          judgement. Every published profile is reviewed by a human editor.
        </p>

        <h2>4. Updates &amp; Corrections</h2>
        <p>
          Biographies are refreshed when meaningful career milestones occur. We update the displayed
          &ldquo;Updated&rdquo; timestamp only after substantive factual additions or corrections.
          To submit a correction, please <Link href="/contact">contact our editorial desk</Link>.
        </p>
      </div>
    </article>
  );
}
