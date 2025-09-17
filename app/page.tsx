import { HeroSection } from "@/components/home/hero-section";
import { SearchSection } from "@/components/home/search-section";
import { FeaturesSection } from "@/components/home/features-section";
import { DepartmentsSection } from "@/components/home/departments-section";
import { AdCarousel } from "@/components/ads/ad-carousel";
import { getActiveAds } from "@/lib/server/ad-service";
import { getConfigValue } from "@/lib/server/config-service";
import { ServicesSection } from "@/components/home/services-section";

export default async function Home() {
  // 获取广告数据
  const { ads } = await getActiveAds();

  // 获取是否显示广告的配置
  const showAds = await getConfigValue<boolean>("home.showAds", true);

  // 获取最大显示广告数量的配置
  const maxAdCount = await getConfigValue<number>("home.maxAdCount", 5);

  // 根据配置限制广告数量
  const displayAds = ads.slice(0, maxAdCount);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <SearchSection />
      {showAds && displayAds.length > 0 && <AdCarousel serverAds={displayAds} />}
      <ServicesSection />
      <DepartmentsSection />
      <FeaturesSection />
    </main>
  )
}
