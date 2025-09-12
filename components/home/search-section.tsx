"use client";

import { SearchComponent } from '@/components/shared/search/search-component';
import { SearchUI } from '@/components/shared/search/search-ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SearchSection() {
  const searchData = SearchComponent({
    type: 'all',
    showTabs: true,
    customPlaceholder: '输入学号、姓名或教室名称...'
  });

  return (
    <section id="search" className="py-20 bg-secondary/5  backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            快速查询课表
          </h2>
          <p className="text-lg text-muted-foreground">
            输入学号、姓名、教室或专业名称，快速查找课程信息
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle>搜索课程表</CardTitle>
            <CardDescription>
              支持学生、教师、教室、专业四种查询方式
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