"use client";

import { SearchComponent } from '@/components/shared/search/search-component';
import { SearchUI } from '@/components/shared/search/search-ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { homeConfig } from "@/lib/config/home.config";

export default function SearchPage() {
  const searchData = SearchComponent({
    type: 'all',
    showTabs: true,
    customPlaceholder: homeConfig.search.placeholder
  });

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {homeConfig.search.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {homeConfig.search.subtitle}
          </p>
        </div>

        <Card className="shadow-2xl border-0 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{homeConfig.search.cardTitle}</CardTitle>
            <CardDescription>
              {homeConfig.search.cardDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SearchUI
              {...searchData}
              showTabs={true}
              compact={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}