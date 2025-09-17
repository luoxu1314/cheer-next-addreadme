import { getActiveAds } from "@/lib/server/ad-service";
import { AdCarousel } from "@/components/ads/ad-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { adsConfig } from "@/lib/config/ads.config";

export default async function AdsPage() {
  const { ads } = await getActiveAds();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-purple bg-clip-text text-transparent mb-4">
            {adsConfig.mainPage.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {adsConfig.mainPage.subtitle}
          </p>
        </div>

        <div className="mb-8 text-center">
          <Button asChild className="gradient-purple text-primary-foreground">
            <Link href="/ads/pricing">
              {adsConfig.mainPage.ctaButton} <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* 使用轮播组件展示所有广告卡片，包括功能说明卡片 */}
        <AdCarousel serverAds={ads} />
      </div>
    </div>
  );
}