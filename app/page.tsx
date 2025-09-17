import { HeroSection } from "@/components/home/hero-section";
import { SearchSection } from "@/components/home/search-section";
import { FeaturesSection } from "@/components/home/features-section";
import { DepartmentsSection } from "@/components/home/departments-section";
import { AdCarousel } from "@/components/ads/ad-carousel";
import { getActiveAds } from "@/lib/server/ad-service";

export default async function Home() {
  const { ads } = await getActiveAds();
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <SearchSection />
      <AdCarousel serverAds={ads} />
      <DepartmentsSection />
      <FeaturesSection />
    </main>
  )
}
