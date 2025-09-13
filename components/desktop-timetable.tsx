import { CourseCard } from "@/components/course-card"
import { CourseClickWrapper } from "@/components/course-detail-modal"
import { formatTimeRange } from "@/lib/timeMapping"

interface CourseItem {
  seq: string
  courseId: string
  name: string
  location: { name: string; id: string; building: string }
  teachers: { name: string; id: string }[]
  studentCount: number
  classId: string
  slot: {
    day: number
    rowIds: number[]
  }
  weeks: string
  weekInterval: string
  term: string
  credit: number
  category: string
}

interface DesktopTimetableProps {
  courses: CourseItem[]
  showWeekend: boolean
  firstColumnMode: "time" | "index"
}

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]

// 将课程按天和时间段分组
function groupCoursesByDayAndTime(courses: CourseItem[]) {
  const grouped: { [key: string]: { [key: string]: CourseItem[] } } = {}

  courses.forEach(course => {
    const dayKey = course.slot.day.toString()
    if (!grouped[dayKey]) {
      grouped[dayKey] = {}
    }

    course.slot.rowIds.forEach(rowId => {
      const timeKey = rowId.toString()
      if (!grouped[dayKey][timeKey]) {
        grouped[dayKey][timeKey] = []
      }
      grouped[dayKey][timeKey].push(course)
    })
  })

  return grouped
}

export function DesktopTimetable({ courses, showWeekend, firstColumnMode }: DesktopTimetableProps) {
  const groupedCourses = groupCoursesByDayAndTime(courses)
  const displayDays = showWeekend ? days : days.slice(0, 5)

  return (
    <div className={`hidden lg:grid gap-4 ${showWeekend ? "grid-cols-8" : "grid-cols-6"}`}>
      <div className="font-semibold text-center py-3 text-sm text-muted-foreground bg-card/50 backdrop-blur-md rounded-xl border border-border/50 shadow-lg">
        {firstColumnMode === "time" ? "时间" : "节次"}
      </div>

      {displayDays.map((day, dayIndex) => (
        <div
          key={day}
          className="font-semibold text-center py-3 text-sm bg-gradient-to-br from-card/70 to-card/50 backdrop-blur-md rounded-xl border border-border/50 shadow-lg text-foreground"
        >
          {day}
        </div>
      ))}

      {/* 生成时间槽和课程网格 */}
      {Array.from({ length: 12 }, (_, timeIndex) => [
        <div
          key={`time-${timeIndex}`}
          className="text-xs  text-muted-foreground flex justify-center items-center py-2 font-mono bg-muted/80 backdrop-blur-md rounded-lg border border-border/40"
        >
          {firstColumnMode === "time"
            ? formatTimeRange([timeIndex + 1])
            : `${timeIndex + 1}`
          }
        </div>,
        ...displayDays.map((day, dayIndex) => {
          const dayKey = (dayIndex + 1).toString()
          const timeKey = (timeIndex + 1).toString()
          const coursesInThisSlot = groupedCourses[dayKey]?.[timeKey] || []

          return (
            <div key={`${day}-${timeIndex}`} className="min-h-[80px] p-1 relative">
              {coursesInThisSlot.length > 0 && (
                <CourseClickWrapper key={coursesInThisSlot[0].seq} course={coursesInThisSlot[0]} courses={coursesInThisSlot}>
                  <CourseCard courses={coursesInThisSlot}>
                  </CourseCard>
                </CourseClickWrapper>
              )}
            </div>
          )
        }),
      ])}
    </div>
  )
}