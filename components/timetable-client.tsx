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
}

export default function TimetableClient({
  terms,
  title,
  courses,
  type,
  id,
}: TimetableClientProps) {
  const [showWeekend, setShowWeekend] = useState(true);
  const [firstColumnMode, setFirstColumnMode] = useState<"time" | "index">("time");
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
    <div className="space-y-6">
      {/* Header with improved SEO structure */}
      <div className="text-center space-y-4 p-6 lg:p-8 rounded-3xl bg-muted/20 backdrop-blur-xl border border-white/50 shadow-2xl shadow-accent/10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-gradient-pink-end bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        {terms.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Select value={currentTerm} onValueChange={handleTermChange}>
              <SelectTrigger className="w-[180px] bg-white/60 backdrop-blur-md border-white/50 shadow-lg rounded-xl">
                <SelectValue placeholder="选择学期" />
              </SelectTrigger>
              <SelectContent>
                {terms.map((term) => (
                  <SelectItem key={term} value={term}>
                    {term}学期
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

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