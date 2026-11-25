import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/article/Breadcrumbs';
import QuickFactsBox from '@/components/article/QuickFactsBox';
import TableOfContents from '@/components/article/TableOfContents';
import ShareLinks from '@/components/article/ShareLinks';
import RelatedArticles from '@/components/article/RelatedArticles';
import SourcesAndCorrections from '@/components/article/SourcesAndCorrections';
import FaqAccordion from '@/components/article/FaqAccordion';
import CommentsSection from '@/components/article/CommentsSection';
import { extractHeadingsFromHtml, formatEditorialDate, getArticleBySlug } from '@/lib/data';
import { buildArticleJsonLd, buildPageMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/constants';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);
  if (!data?.article) return { title: 'Profile Not Found' };

  const { article } = data;
  return buildPageMetadata({
    title: article.seoTitle || article.title,
    description: article.metaDescription || article.excerpt,
    path: `/celebrity/${article.slug}`,
    image: article.socialImage || article.heroImage?.url,
    type: 'article',
  });
}

export default async function CelebrityArticlePage({ params }) {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);
  if (!data?.article) notFound();

  const { article, related = [], comments = [] } = data;
  const headings = extractHeadingsFromHtml(article.body);
  const canonicalUrl = `${SITE_CONFIG.url}/celebrity/${article.slug}`;
  const jsonLd = buildArticleJsonLd(article);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          {
            label: article.categoryId?.name || 'Celebrities',
            href: `/category/${article.categoryId?.slug || 'celebrities'}`,
          },
          { label: article.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4">
        {/* Main Article Column */}
        <article className="lg:col-span-8">
          <header>
            <Link
              href={`/category/${article.categoryId?.slug || 'celebrities'}`}
              className="text-xs uppercase tracking-widest font-semibold text-brand-gold hover:underline"
            >
              {article.categoryId?.name || 'Biography'}
            </Link>

            <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-[1.14] text-brand-black">
              {article.title}
            </h1>

            <p className="mt-4 text-lg text-brand-charcoal/85 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-brand-charcoal/75">
              <span>
                By{' '}
                <Link
                  href={`/author/${article.authorId?.slug || 'eleanor-vance'}`}
                  className="font-semibold text-brand-black hover:text-brand-gold"
                >
                  {article.authorId?.name || 'CelebScope Editorial'}
                </Link>
              </span>
              {article.publishedAt && (
                <span>
                  Published{' '}
                  <time dateTime={article.publishedAt}>
                    {formatEditorialDate(article.publishedAt)}
                  </time>
                </span>
              )}
              {article.updatedAt && (
                <span>
                  Updated{' '}
                  <time dateTime={article.updatedAt} className="font-medium text-brand-black">
                    {formatEditorialDate(article.updatedAt)}
                  </time>
                </span>
              )}
            </div>
          </header>

          {/* Hero Figure */}
          <figure className="my-7">
            <div className="aspect-[16/9] bg-brand-black overflow-hidden border border-black/10">
              <img
                src={article.heroImage?.url || '/images/editorial-celebrities.svg'}
                alt={article.heroImage?.altText || article.title}
                width={1200}
                height={675}
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
            {(article.heroImage?.caption || article.heroImage?.credit) && (
              <figcaption className="mt-2 text-xs text-brand-charcoal/70 flex flex-wrap justify-between gap-2">
                <span>{article.heroImage?.caption}</span>
                {article.heroImage?.credit && (
                  <span className="italic">Credit: {article.heroImage.credit}</span>
                )}
              </figcaption>
            )}
          </figure>

          <ShareLinks title={article.title} url={canonicalUrl} />

          {/* Table of Contents & Quick Facts */}
          <div className="mt-6">
            <TableOfContents headings={headings} />
            <QuickFactsBox facts={article.quickFacts} />
          </div>

          {/* Main Biography Prose */}
          <div
            className="editorial-prose mt-6"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* FAQs */}
          <FaqAccordion faqs={article.faqs} />

          {/* Sources & Corrections */}
          <SourcesAndCorrections sources={article.sources} />

          {/* Author & Editorial Review Box */}
          <aside className="mt-10 bg-brand-gray border border-black/10 p-6">
            <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
              Editorial Review &amp; Author
            </p>
            <h2 className="mt-1 text-lg font-bold">
              <Link
                href={`/author/${article.authorId?.slug || 'eleanor-vance'}`}
                className="hover:text-brand-gold"
              >
                {article.authorId?.name || 'CelebScope Editorial'}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-brand-charcoal/80 leading-relaxed">
              {article.authorId?.bio ||
                'Reviewed by the CelebScope editorial desk for factual sourcing and clarity.'}
            </p>
            <Link
              href="/editorial-policy"
              className="inline-block mt-3 text-xs font-semibold underline hover:text-brand-gold"
            >
              Read our Editorial &amp; Sourcing Standards
            </Link>
          </aside>

          {/* Moderated Reader Comments */}
          <CommentsSection slug={article.slug} initialComments={comments} />
        </article>

        {/* Sidebar (Desktop Right, Mobile Below Article) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            <RelatedArticles articles={related} />

            <aside className="bg-brand-black text-brand-white p-6">
              <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
                Verification Standard
              </p>
              <h2 className="mt-2 text-lg font-bold text-brand-white">
                Primary-Sourced Reporting
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-brand-white/75">
                CelebScope profiles avoid unverified rumours and speculative financial claims. Spot
                an error? Let our editorial desk know.
              </p>
              <Link
                href="/contact"
                className="inline-block mt-4 text-xs font-semibold text-brand-gold hover:underline"
              >
                Submit a Correction &rarr;
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
