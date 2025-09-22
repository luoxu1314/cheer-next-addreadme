import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DiscoveryCharts from './discovery-charts';
import { PageHeader } from "@/components/layout/page-header";

// 直接导入统计服务函数
import {
  getMostCommonSubjects,
  getMostPopularCourses,
  getDepartmentCourseDistribution,
  getCourseCategoryDistribution,
  getMostUsedLocations,
  getLeastUsedLocations,
  getMostActiveTeachers,
  getMostPopularElectiveCourses,
} from "@/lib/server/service/stats-service";

// 导入prisma客户端用于直接查询总数
import prisma from '@/lib/prisma';


// 发现页面组件 - 作为Next.js服务器组件直接导出
export default async function DiscoveryPage() {
  // 并行获取所有统计数据
  const [
    mostCommonSubjects,
    mostPopularCourses,
    departmentDistribution,
    categoryDistribution,
    mostUsedLocations,
    mostActiveTeachers,
    mostPopularElectiveCourses,
    leastUsedLocations,
    // 直接获取总数
    totalCourses,
    totalSubjects,
    totalLocations
  ] = await Promise.all([
    getMostCommonSubjects(10),
    getMostPopularCourses(10),
    getDepartmentCourseDistribution(),
    getCourseCategoryDistribution(),
    getMostUsedLocations(10),
    getMostActiveTeachers(10),
    getMostPopularElectiveCourses(10),
    getLeastUsedLocations(10),
    // 使用prisma直接查询总数
    prisma.course.count(),
    prisma.subject.count(),
    prisma.location.count({ where: { id: { not: "00default" } } })
  ]);

  // 构建统计数据对象
  const stats = {
    mostCommonSubjects,
    mostPopularCourses,
    departmentDistribution,
    categoryDistribution,
    mostUsedLocations,
    mostActiveTeachers,
    mostPopularElectiveCourses,
    leastUsedLocations,
    basic: {
      // 使用直接查询得到的准确总数
      courses: totalCourses,
      subjects: totalSubjects,
      locations: totalLocations
    },
  };

  return (
    <>
      {/* 页面标题 - 使用可复用组件 */}
      <PageHeader
        title="绮课数据发现"
        description="探索中南大学课程背后的有趣数据，发现你不知道的校园学习生态"
        className="mt-16 mb-8"
      />
      <div className="container mx-auto px-4 ">
        {/* 基本统计卡片 */}
        {stats?.basic && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-md gradient-blue text-primary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-primary-foreground">开设课程</CardTitle>
                <CardDescription className="text-primary-foreground/80">总课程数量</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary-foreground">
                  {stats.basic.courses.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md gradient-lavender text-secondary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-secondary-foreground">
                  课程科目
                </CardTitle>
                <CardDescription className="text-secondary-foreground/80">总科目数量</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-secondary-foreground">
                  {stats.basic.subjects.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md gradient-purple text-accent-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-accent-foreground">上课地点</CardTitle>
                <CardDescription className="text-accent-foreground/80">总教室数量</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-accent-foreground">
                  {stats.basic.locations.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 图表内容区域 - 使用客户端组件 */}
        <DiscoveryCharts
          leastUsedLocations={stats.leastUsedLocations}
          mostCommonSubjects={stats.mostCommonSubjects}
          mostPopularCourses={stats.mostPopularCourses}
          departmentDistribution={stats.departmentDistribution}
          categoryDistribution={stats.categoryDistribution}
          mostUsedLocations={stats.mostUsedLocations}
          mostActiveTeachers={stats.mostActiveTeachers}
          mostPopularElectiveCourses={stats.mostPopularElectiveCourses}
        />

        {/* 页脚说明 */}
        <div className="mt-16 text-center text-muted-foreground text-sm">
          <p>数据更新时间: {new Date().toLocaleString("zh-CN")}</p>
          <p className="mt-2">本页面数据仅供参考，具体以学校官方信息为准</p>
        </div>
      </div>
    </>
  );

}
