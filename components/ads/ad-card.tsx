import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface Ad {
  id: string;
  title: string;
  content: string;
  slug: string;
  coverImage?: string | null;
  adClient: string;
  adPrice: number;
  adDuration: number;
  adStartDate: Date;
  adEndDate: Date;
  createdAt: Date;
}

interface AdCardProps {
  ad: Ad;
}

export function AdCard({ ad }: AdCardProps) {
  const formatPrice = (price: number) => {
    return (price / 100).toFixed(0);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-chart-3/20 hover:border-chart-3/40">
      {ad.coverImage && (
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={ad.coverImage}
            alt={ad.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge className="absolute top-3 right-3 bg-chart-3 text-primary-foreground">
            推广
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">
            {ad.title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {ad.content}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs border-chart-3 text-chart-3">
              {ad.adClient}
            </Badge>
            <span className="text-sm font-semibold text-chart-3">
              ¥{formatPrice(ad.adPrice)}/{ad.adDuration}个月
            </span>
          </div>

          <div className="text-xs text-muted-foreground">
            有效期: {formatDate(ad.adStartDate)} - {formatDate(ad.adEndDate)}
          </div>

          <Button 
            asChild 
            size="sm" 
            className="w-full gradient-purple"
          >
            <Link href={`/ads/${ad.slug}`}>
              查看详情
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}