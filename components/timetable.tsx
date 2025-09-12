"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TimetableHeader, WeekendToggle } from "@/components/timetable-header";
import { DesktopTimetable } from "@/components/desktop-timetable";
import { MobileTimetable } from "@/components/mobile-timetable";

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

interface TimeTableProps {
  terms: string[];
  title: string;
  courses: CourseItem[];
  type: string;
  id: string;
}

export default function TimeTable({
  terms,
  title,
  courses,
  type,
  id,
}: TimeTableProps) {
  const [showWeekend, setShowWeekend] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // 从 URL 解析当前 term
  const pathParts = pathname.split("/").filter(Boolean);
  // URL 格式: /table/[type]/[id]/[term]/[grade]
  const currentTerm = pathParts[3] || terms[0] || "";
  const currentGrade = pathParts[4] || "";

  const handleTermChange = (newTerm: string) => {
    const basePath = `/table/${type}/${id}`;
    const newPath = currentGrade
      ? `${basePath}/${newTerm}/${currentGrade}`
      : `${basePath}/${newTerm}`;
    router.push(newPath);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,var(--primary)/15,transparent_50%),radial-gradient(circle_at_80%_20%,var(--secondary)/15,transparent_50%),radial-gradient(circle_at_40%_40%,var(--accent)/10,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-30 transition-colors duration-300"></div>

      <div className="relative w-full max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        <TimetableHeader
          title={title}
          terms={terms}
          currentTerm={currentTerm}
          onTermChange={handleTermChange}
          showWeekend={showWeekend}
          onShowWeekendChange={setShowWeekend}
        />

        <DesktopTimetable courses={courses} showWeekend={showWeekend} firstColumnMode="time"/>

        <MobileTimetable
          courses={courses}
          showWeekend={showWeekend}
          firstColumnMode="index"
        />
      </div>
    </div>
  );
}
