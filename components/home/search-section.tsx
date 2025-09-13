"use client";

import { SearchComponent } from '@/components/shared/search/search-component';
import { SearchUI } from '@/components/shared/search/search-ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { homeConfig } from "@/lib/config/home.config";

export function SearchSection() {
  const searchData = SearchComponent({
    type: 'all',
    showTabs: true,
    customPlaceholder: homeConfig.search.placeholder
  });

  return (
    <section id="search" className="py-20 bg-secondary/5  backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {homeConfig.search.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {homeConfig.search.subtitle}
          </p>
        </div>

        <Card className="shadow-2xl border-0">
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
    </section>
  );
}