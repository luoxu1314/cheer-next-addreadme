"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

interface DiscoveryChartsProps {
  mostCommonSubjects: any[];
  mostPopularCourses: any[];
  departmentDistribution: any[];
  categoryDistribution: any[];
  mostUsedLocations: any[];
  leastUsedLocations: any[];
  mostActiveTeachers: any[];
  mostPopularElectiveCourses: any[];
}

// 使用CSS变量获取预定义的图表颜色
const getChartColors = () => {
  const style = getComputedStyle(document.documentElement);
  return [
    style.getPropertyValue("--chart-1").trim(),
    style.getPropertyValue("--chart-2").trim(),
    style.getPropertyValue("--chart-3").trim(),
    style.getPropertyValue("--chart-4").trim(),
    style.getPropertyValue("--chart-5").trim(),
  ];
};

interface TooltipContentProps {
  active: boolean;
  payload: any;
  label: string;
  formatter?: (value: any) => [string, string];
}

// 自定义 Tooltip 组件，用于显示增强的信息
const CustomTooltip = ({
  active,
  payload,
  label,
  formatter,
}: TooltipContentProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const formattedValue = formatter
      ? formatter(payload[0].value)
      : [`${payload[0].value}`, payload[0].name];

    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-gray-900 mb-2">{label}</p>
        <p className="text-sm text-gray-600 mb-2">{formattedValue[0]}</p>

        {/* 显示增强信息 */}
        {data.department && (
          <p className="text-xs text-gray-500">院系: {data.department}</p>
        )}
        {data.facultyName && (
          <p className="text-xs text-gray-500">学院: {data.facultyName}</p>
        )}
        {data.building && (
          <p className="text-xs text-gray-500">教学楼: {data.building}</p>
        )}
        {data.campus && (
          <p className="text-xs text-gray-500">校区: {data.campus}</p>
        )}
        {data.category && (
          <p className="text-xs text-gray-500">类别: {data.category}</p>
        )}
        {data.className && (
          <p className="text-xs text-gray-500">班级: {data.className}</p>
        )}
        {data.teachers && data.teachers.length > 0 && (
          <p className="text-xs text-gray-500">
            教师:{" "}
            {data.teachers
              .map(
                (t: any) =>
                  `${t.name}${t.facultyName ? `(${t.facultyName})` : ""}`
              )
              .join(", ")}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function DiscoveryCharts({
  mostCommonSubjects,
  mostPopularCourses,
  departmentDistribution,
  categoryDistribution,
  mostUsedLocations,
  leastUsedLocations,
  mostActiveTeachers,
  mostPopularElectiveCourses,
}: DiscoveryChartsProps) {
  const router = useRouter();
  // 获取图表颜色
  const CHART_COLORS = getChartColors();

  return (
    <Tabs defaultValue="popular" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="popular">热门课程</TabsTrigger>
        <TabsTrigger value="distribution">分布统计</TabsTrigger>
        <TabsTrigger value="activity">活跃度分析</TabsTrigger>
      </TabsList>

      {/* 热门课程标签页 */}
      <TabsContent value="popular" className="space-y-8">
        {/* 开课次数最多的课程 */}
        {mostCommonSubjects && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                你知道中南开课次数最多的一门课是什么吗？
              </CardTitle>
              <CardDescription>
                以下是中南大学开课次数最多的前10门课程，这些课程可能是各专业的基础必修课或备受学生欢迎的选修课
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mostCommonSubjects}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          active={true}
                          payload={[]}
                          label=""
                          formatter={(value) => [`${value} 次开课`, "开课次数"]}
                        />
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="count"
                      name="开课次数"
                      fill={CHART_COLORS[0]}
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                      animationDuration={1500}
                      onClick={(data) => {
                        const subjectId = data.id;
                        router.push(`/subjects/${subjectId}`);
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 最受欢迎的课程(按选课人数) */}
        {mostPopularCourses && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                哪些课程最受中南学子欢迎？
              </CardTitle>
              <CardDescription>
                以下是选课人数最多的课程，这些课程可能内容丰富有趣，或者是专业必修课
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mostPopularCourses}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip
                      content={
                        <CustomTooltip
                          active={true}
                          payload={[]}
                          label=""
                          formatter={(value) => [`${value} 人`, "选课人数"]}
                        />
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="studentCount"
                      name="选课人数"
                      fill={CHART_COLORS[1]}
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      onClick={(data) => {
                        const courseId = data.payload.id;
                        router.push(`/course/${courseId}`);
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 最受欢迎的公选课 */}
        {mostPopularElectiveCourses && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">哪些公选课最受欢迎？</CardTitle>
              <CardDescription>
                以下是中南大学选课人数最多的公共选修课，这些课程通常内容丰富有趣，深受学生喜爱
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mostPopularElectiveCourses}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip
                      content={
                        <CustomTooltip
                          active={true}
                          payload={[]}
                          label=""
                          formatter={(value) => [`${value} 人`, "选课人数"]}
                        />
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="studentCount"
                      name="选课人数"
                      fill={CHART_COLORS[4]}
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      onClick={(data) => {
                          const courseId = data.payload.id;
                          router.push(`/course/${courseId}`);
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* 分布统计标签页 */}
      <TabsContent value="distribution" className="space-y-8">
        {/* 课程类别分布 */}
        {categoryDistribution && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                中南大学的课程类型有哪些？
              </CardTitle>
              <CardDescription>
                不同类别课程的数量分布，了解学校的课程结构和教学重点
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryDistribution}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip
                      content={
                        <CustomTooltip
                          active={true}
                          payload={[]}
                          label=""
                          formatter={(value) => [`${value} 门课程`, "课程数量"]}
                        />
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="count"
                      name="课程数量"
                      fill={CHART_COLORS[2]}
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    >
                      {categoryDistribution.map((entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* 活跃度分析标签页 */}
      <TabsContent value="activity" className="space-y-8">
        {/* 教室使用情况 */}
        {mostUsedLocations && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">使用频率最高的教室</CardTitle>
              <CardDescription>
                中南大学使用次数最多的教室，看看你常去的教室是否上榜
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mostUsedLocations}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip
                      content={
                        <CustomTooltip
                          active={true}
                          payload={[]}
                          label=""
                          formatter={(value) => [`${value} 次使用`, "使用次数"]}
                        />
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="count"
                      name="使用次数"
                      fill={CHART_COLORS[3]}
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      onClick={(data) => {
                        const locationId = data.payload.id;
                        router.push(`/schedule/location/${locationId}`);
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 教师授课情况 */}
        {mostActiveTeachers && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">哪些老师授课最多？</CardTitle>
              <CardDescription>
                中南大学最活跃的教师，他们为学生传授知识，付出了辛勤的努力
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mostActiveTeachers}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          active={true}
                          payload={[]}
                          label=""
                          formatter={(value) => [
                            `累计${value} 课时`,
                            "授课课时",
                          ]}
                        />
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="count"
                      name="授课课时"
                      fill={CHART_COLORS[4]}
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                      animationDuration={1500}
                      onClick={(data) => {
                        const teacherId = data.payload.id;
                        router.push(`/schedule/teacher/${teacherId}`);
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 使用频率最低的教室 */}
        {leastUsedLocations && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">使用频率最低的教室</CardTitle>
              <CardDescription>
                中南大学使用次数最少的教室，这些教室可能位于较偏远的校区或较少使用
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={leastUsedLocations}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip
                      content={
                        <CustomTooltip
                          active={true}
                          payload={[]}
                          label=""
                          formatter={(value) => [`${value} 次使用`, "使用次数"]}
                        />
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="count"
                      name="使用次数"
                      fill={CHART_COLORS[2]}
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      onClick={(data) => {
                        const locationId = data.payload.id;
                        router.push(`/schedule/location/${locationId}`);
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
}
