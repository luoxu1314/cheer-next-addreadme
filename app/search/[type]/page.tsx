import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import TimetableClient  from "@/components/timetable-client";

interface SearchPageProps {
  params: {
    type: string;
  };
  searchParams: {
    q?: string;
  };
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const { type } = params;
  
  const titles = {
    student: "学生课表查询 - 绮课",
    teacher: "教师课表查询 - 绮课",
    location: "教室课表查询 - 绮课",
  };

  const descriptions = {
    student: "中南大学学生课程表在线查询，支持按学号、姓名快速查找课程信息",
    teacher: "中南大学教师课程表在线查询，支持按教师姓名快速查找授课信息",
    location: "中南大学教室课程表在线查询，支持按教室名称快速查找教室使用情况",
  };

  return {
    title: titles[type as keyof typeof titles] || "课表查询 - 绮课",
    description: descriptions[type as keyof typeof descriptions] || "中南大学课程表在线查询",
    keywords: ["中南大学", "课程表", "课表查询", type, "绮课"],
    openGraph: {
      title: titles[type as keyof typeof titles] || "课表查询 - 绮课",
      description: descriptions[type as keyof typeof descriptions] || "中南大学课程表在线查询",
      type: "website",
      locale: "zh_CN",
    },
  };
}

export default function SearchPage({ params, searchParams }: SearchPageProps) {
  const { type } = params;
  const { q } = searchParams;

  const validTypes = ["student", "teacher", "location"];
  if (!validTypes.includes(type)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {type === "student" && "学生课表查询"}
            {type === "teacher" && "教师课表查询"}
            {type === "location" && "教室课表查询"}
          </h1>
          <p className="text-slate-600">
            {type === "student" && "输入学号或姓名查询学生课程表"}
            {type === "teacher" && "输入教师姓名查询教师授课表"}
            {type === "location" && "输入教室名称查询教室使用情况"}
          </p>
        </div>

        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        }>
          <TimetableClient terms={[]} title={""} courses={[]} type={type} id={q || ""} />
        </Suspense>
      </div>
    </div>
  );
}