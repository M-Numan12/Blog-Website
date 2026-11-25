import HeroStory from '@/components/home/HeroStory';
import LatestArticles from '@/components/home/LatestArticles';
import CategoryGrid from '@/components/home/CategoryGrid';
import TrendingList from '@/components/home/TrendingList';
import FeaturedBiographies from '@/components/home/FeaturedBiographies';
import RecentlyUpdated from '@/components/home/RecentlyUpdated';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div>
      <HeroStory />
      <LatestArticles />
      <CategoryGrid />
      <TrendingList />
      <FeaturedBiographies />
      <RecentlyUpdated />
      <NewsletterSection />
    </div>
  );
}
