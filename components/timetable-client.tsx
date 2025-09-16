"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TimetableHeader } from "@/components/timetable-header";
import { DesktopTimetable } from "@/components/desktop-timetable";
import { MobileTimetable } from "@/components/mobile-timetable";
import { SettingsSidebar } from "@/components/layout/settings-sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface CourseItem {
  seq: string;
  courseId: string;
  name: string;
  location: { name: string; id: string; building: string };
  teachers: { name: string; id: string }[];
  studentCount: number;
  classId: string;
  slot: {
    day: number;
    rowIds: number[];
  };
  weeks: string;
  weekInterval: string;
  term: string;
  credit: number;
  category: string;
}

interface TimetableClientProps {
  terms: string[];
  title: string;
  courses: CourseItem[];
  type: string;
  id: string;
  grades?: string[];
}

export default function TimetableClient({
  terms,
  title,
  courses,
  type,
  id,
  grades = [],
}: TimetableClientProps) {
  // 默认关闭移动端显示周末，并从 localStorage 读取设置
  const [mobileShowWeekend, setMobileShowWeekend] = useState<boolean>(() => {
    const saved = localStorage.getItem('mobileShowWeekend');
    return saved === null ? false : saved === 'true';
  });

  // 当设置改变时保存到 localStorage
  const handleMobileShowWeekendChange = (value: boolean) => {
    setMobileShowWeekend(value);
    localStorage.setItem('mobileShowWeekend', value.toString());
  };
  
  // 从 localStorage 读取第一列显示模式设置
  const [firstColumnMode, setFirstColumnMode] = useState<"time" | "index">(() => {
    const saved = localStorage.getItem('firstColumnMode');
    return saved === 'index' ? 'index' : 'time';
  });
  
  // 当第一列显示模式改变时保存到 localStorage
  const handleFirstColumnModeChange = (value: "time" | "index") => {
    setFirstColumnMode(value);
    localStorage.setItem('firstColumnMode', value);
  };
  const router = useRouter();
  const pathname = usePathname();

  // 从 URL 解析当前 term 和 grade
  const pathParts = pathname.split("/").filter(Boolean);
  // URL 格式: /table/[type]/[id]/[term]
  const currentTerm = pathParts[3] || terms[0] || "";

  // 对于专业课表，从id中解析年级信息
  let currentGrade = "";
  let professionName = id;
  if (type === 'profession' && id.includes('-')) {
    const parts = id.split('-');
    currentGrade = parts[parts.length - 1];
    professionName = parts.slice(0, -1).join('-');
  }

  const handleTermChange = (newTerm: string) => {
    const basePath = `/table/${type}/${id}`;
    const newPath = `${basePath}/${newTerm}`;
    router.push(newPath);
  };

  const handleGradeChange = (newGrade: string) => {
    const newId = `${professionName}-${newGrade}`;
    const basePath = `/table/${type}/${newId}`;
    const newPath = currentTerm ? `${basePath}/${currentTerm}` : basePath;
    router.push(newPath);
  };

  return (
    <div className="space-y-6">
      {/* Header with improved SEO structure */}
      <TimetableHeader
        title={title}
        terms={terms}
        currentTerm={currentTerm}
        onTermChange={handleTermChange}
        showWeekend={mobileShowWeekend}
        onShowWeekendChange={handleMobileShowWeekendChange}
        type={type}
        grades={grades}
        currentGrade={currentGrade}
        onGradeChange={handleGradeChange}
      />

      {/* Settings Sidebar for Desktop */}
      <SettingsSidebar
          showWeekend={mobileShowWeekend}
          onShowWeekendChange={handleMobileShowWeekendChange}
          firstColumnMode={firstColumnMode}
          onFirstColumnModeChange={handleFirstColumnModeChange}
        />

      {/* Timetable Content */}
      <div id="timetable-content" className="space-y-6">
        <DesktopTimetable
          courses={courses}
          firstColumnMode={firstColumnMode}
        />
        <MobileTimetable
          courses={courses}
          showWeekend={mobileShowWeekend} // 移动端根据设置显示周末
        firstColumnMode={firstColumnMode}
        />
      </div>
    </div>
  );
}