import { HeroSection } from "@/components/home/hero-section";
import { SearchSection } from "@/components/home/search-section";
import { FeaturesSection } from "@/components/home/features-section";
import { DepartmentsSection } from "@/components/home/departments-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <SearchSection />
      <DepartmentsSection />
      <FeaturesSection />
    </main>
  )
}
