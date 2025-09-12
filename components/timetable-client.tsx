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
  const [showWeekend, setShowWeekend] = useState(true);
  const [firstColumnMode, setFirstColumnMode] = useState<"time" | "index">("time");
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
        showWeekend={showWeekend}
        onShowWeekendChange={setShowWeekend}
        type={type}
        grades={grades}
        currentGrade={currentGrade}
        onGradeChange={handleGradeChange}
      />

      {/* Settings Sidebar for Desktop */}
      <SettingsSidebar
        showWeekend={showWeekend}
        onShowWeekendChange={setShowWeekend}
        firstColumnMode={firstColumnMode}
        onFirstColumnModeChange={setFirstColumnMode}
      />

      {/* Timetable Content */}
      <div className="space-y-6">
        <DesktopTimetable
          courses={courses}
          showWeekend={showWeekend}
          firstColumnMode={firstColumnMode}
        />
        <MobileTimetable
          courses={courses}
          showWeekend={showWeekend}
          firstColumnMode={firstColumnMode}
        />
      </div>
    </div>
  );
}