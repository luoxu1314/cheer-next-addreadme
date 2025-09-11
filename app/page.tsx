import { HeroSection } from "@/components/home/hero-section";
import { SearchSection } from "@/components/home/search-section";
import { FeaturesSection } from "@/components/home/features-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <SearchSection />
      <FeaturesSection />
    </main>
  )
}
