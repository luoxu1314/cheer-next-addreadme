import { getActiveAds } from "@/lib/server/ad-service";
import { AdCard } from "@/components/ads/ad-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function AdsPage() {
  const { ads } = await getActiveAds();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-purple bg-clip-text text-transparent mb-4">
            绮课推广
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            发现校园里的精彩创意和优质推广内容
          </p>
        </div>

        <div className="mb-8 text-center">
          <Button asChild className="gradient-purple">
            <Link href="/ads/pricing">
              投放广告 <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {ads.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">暂无推广内容</h3>
              <p className="text-muted-foreground mb-4">
                目前还没有活跃的推广内容，敬请期待！
              </p>
              <Button asChild variant="outline">
                <Link href="/ads/pricing">
                  成为第一个推广者
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