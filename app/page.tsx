import { HeroSection } from "@/components/home/hero-section";
import { SearchSection } from "@/components/home/search-section";
import { FeaturesSection } from "@/components/home/features-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <HeroSection />
      <SearchSection />
      <FeaturesSection />
    </main>
  )
}
