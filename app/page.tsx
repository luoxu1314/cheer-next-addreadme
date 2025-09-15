import { HeroSection } from "@/components/home/hero-section";
import { SearchSection } from "@/components/home/search-section";
import { FeaturesSection } from "@/components/home/features-section";
import { DepartmentsSection } from "@/components/home/departments-section";
import { AdCarousel } from "@/components/ads/ad-carousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <SearchSection />
      <AdCarousel />
      <DepartmentsSection />
      <FeaturesSection />
    </main>
  )
}
