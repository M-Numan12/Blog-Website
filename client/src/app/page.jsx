import HeroStory from '@/components/home/HeroStory';
import LatestArticles from '@/components/home/LatestArticles';
import CategoryGrid from '@/components/home/CategoryGrid';
import TrendingList from '@/components/home/TrendingList';
import FeaturedBiographies from '@/components/home/FeaturedBiographies';
import RecentlyUpdated from '@/components/home/RecentlyUpdated';
import NewsletterSection from '@/components/home/NewsletterSection';
import { getArticles, getCategories } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata = buildPageMetadata({
  title: `${SITE_CONFIG.name} — Celebrity Biographies & Entertainment Editorial`,
  description: SITE_CONFIG.tagline,
  path: '/',
});

export default async function HomePage() {
  const [latestRes, trendingRes, featuredRes, updatedRes, categories] = await Promise.all([
    getArticles({ limit: 7 }),
    getArticles({ trending: true, limit: 4 }),
    getArticles({ featured: true, limit: 3 }),
    getArticles({ sort: 'updated', limit: 4 }),
    getCategories(),
  ]);

  const heroArticle = featuredRes.articles[0] || latestRes.articles[0];
  const latestGrid = latestRes.articles.filter((a) => a.slug !== heroArticle?.slug).slice(0, 6);

  return (
    <div>
      <HeroStory article={heroArticle} />
      <LatestArticles articles={latestGrid} />
      <CategoryGrid categories={categories} />
      <TrendingList articles={trendingRes.articles} />
      <FeaturedBiographies articles={featuredRes.articles} />
      <RecentlyUpdated articles={updatedRes.articles} />
      <NewsletterSection />
    </div>
  );
}
