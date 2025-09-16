import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DiscoveryCharts from './discovery-charts';

// 直接导入统计服务函数
import {
  getMostCommonSubjects,
  getMostPopularCourses,
  getDepartmentCourseDistribution,
  getCourseCategoryDistribution,
  getMostUsedLocations,
  getMostActiveTeachers,
  getMostPopularElectiveCourses,
} from "@/lib/server/service/stats-service";

// 加载状态组件
const LoadingState = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="mb-12">
      <Skeleton className="h-8 w-64 mb-4" />
      <Skeleton className="h-4 w-96" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

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
  ] = await Promise.all([
    getMostCommonSubjects(10),
    getMostPopularCourses(10),
    getDepartmentCourseDistribution(),
    getCourseCategoryDistribution(),
    getMostUsedLocations(10),
    getMostActiveTeachers(10),
    getMostPopularElectiveCourses(10),
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
    basic: {
      // 从各统计数据中计算基础统计
      courses: mostPopularCourses.length,
      subjects: mostCommonSubjects.length,
      departments: departmentDistribution.length,
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">
          绮课数据发现
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          探索中南大学课程背后的有趣数据，发现你不知道的校园学习生态
        </p>
      </div>

      {/* 基本统计卡片 */}
      {stats?.basic && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-blue-700">开设课程</CardTitle>
              <CardDescription>总课程数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">
                {stats.basic.courses.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-emerald-700">
                课程科目
              </CardTitle>
              <CardDescription>总科目数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-emerald-600">
                {stats.basic.subjects.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-amber-700">教学院系</CardTitle>
              <CardDescription>总院系数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-amber-600">
                {stats.basic.departments.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 图表内容区域 - 使用客户端组件 */}
      <DiscoveryCharts 
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
  );
}
