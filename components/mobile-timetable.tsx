import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin } from "lucide-react";
import { CourseClickWrapper } from "@/components/course-detail-modal";

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

interface MobileTimetableProps {
  courses: CourseItem[];
  showWeekend: boolean;
  firstColumnMode: "time" | "index";
}

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const dayAbbreviations = ["一", "二", "三", "四", "五", "六", "日"];

// 将课程按天和时间段分组
function groupCoursesByDayAndTime(courses: CourseItem[]) {
  const grouped: { [key: string]: { [key: string]: CourseItem[] } } = {};

  courses.forEach((course) => {
    const dayKey = course.slot.day.toString();
    if (!grouped[dayKey]) {
      grouped[dayKey] = {};
    }

    course.slot.rowIds.forEach((rowId) => {
      const timeKey = rowId.toString();
      if (!grouped[dayKey][timeKey]) {
        grouped[dayKey][timeKey] = [];
      }
      grouped[dayKey][timeKey].push(course);
    });
  });

  return grouped;
}

export function MobileTimetable({
  courses,
  showWeekend,
  firstColumnMode,
}: MobileTimetableProps) {
  const groupedCourses = groupCoursesByDayAndTime(courses);
  const displayDays = showWeekend ? days : days.slice(0, 5);
  const displayDayAbbr = showWeekend
    ? dayAbbreviations
    : dayAbbreviations.slice(0, 5);

  return (
    <div className="lg:hidden">
      <div className="bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg overflow-hidden">
        <div
          className={`grid gap-0  border-b border-border/50`}
          style={{
            gridTemplateColumns: showWeekend
              ? "24px repeat(7, 1fr)"
              : "28px repeat(5, 1fr)",
          }}
        >
          <div className="p-2 text-center  font-semibold text-xs text-muted-foreground border-r border-border/50 bg-secondary/30">
            {firstColumnMode === "time" ? "时间" : "节"}
          </div>
          {displayDays.map((day, index) => (
            <div
              key={day}
              className="p-2 text-center font-semibold text-xs text-foreground border-r border-border/50 last:border-r-0"
            >
              {displayDayAbbr[index]}
            </div>
          ))}
        </div>

        <div className="">
          {Array.from({ length: 12 }, (_, timeIndex) => (
            <div
              key={`mobile-time-${timeIndex}`}
              className={`grid gap-0 border-t border-border/30`}
              style={{
                gridTemplateColumns: showWeekend
                  ? "24px repeat(7, 1fr)"
                  : "28px repeat(5, 1fr)",
              }}
            >
              <div className="p-2 text-center text-xs align-middle  font-mono text-muted-foreground border-r border-border/50 bg-secondary/30">
                {firstColumnMode === "time"
                  ? `${timeIndex + 1}节`
                  : `${timeIndex + 1}`}
              </div>
              {displayDays.map((day, dayIndex) => {
                const dayKey = (dayIndex + 1).toString();
                const timeKey = (timeIndex + 1).toString();
                const coursesInThisSlot =
                  groupedCourses[dayKey]?.[timeKey] || [];

                return (
                  <div
                    key={`mobile-${day}-${timeIndex}`}
                    className="min-h-[60px] p-0.5 py-[1px] border-r border-border/50 last:border-r-0"
                  >
                    {coursesInThisSlot.length > 0 && (
                      <CourseClickWrapper
                        key={coursesInThisSlot[0].seq}
                        course={coursesInThisSlot[0]}
                        courses={coursesInThisSlot}
                      >
                        <div
                          className={`h-full bg-gradient-to-br from-chart-1/10 to-chart-3/10 rounded-lg border border-border/50 p-1.5 hover:shadow-md transition-all duration-200 ${
                            coursesInThisSlot.length > 1 ? "relative" : ""
                          }`}
                        >
                          <div className="space-y-1">
                            <h4 className="font-bold text-[10px] leading-tight text-foreground line-clamp-2">
                              {coursesInThisSlot[0].name}
                            </h4>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                                <User className="w-2 h-2 text-chart-1" />
                                <span className="truncate">
                                  {coursesInThisSlot[0].teachers[0]?.name || ""}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                                <MapPin className="w-2 h-2 text-chart-3" />
                                <span className="truncate">
                                  {coursesInThisSlot[0].location.name}
                                </span>
                              </div>
                            </div>
                            {coursesInThisSlot.length > 1 && (
                              <Badge className="ml-auto bg-chart-1 rounded-full text-[8px] h-4">
                                +{coursesInThisSlot.length - 1}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CourseClickWrapper>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
