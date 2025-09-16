import { getActiveAds } from "@/lib/server/ad-service";
import { AdCard } from "@/components/ads/ad-card";
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

        {ads.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">{adsConfig.mainPage.emptyState.emoji}</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{adsConfig.mainPage.emptyState.title}</h3>
              <p className="text-muted-foreground mb-4">
                {adsConfig.mainPage.emptyState.description}
              </p>
              <Button asChild variant="outline" className="border-border text-foreground hover:bg-accent/10 hover:text-accent">
                <Link href="/ads/pricing">
                  {adsConfig.mainPage.emptyState.buttonText}
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}