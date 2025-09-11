import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, MapPin } from "lucide-react"

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

interface MobileTimetableProps {
  courses: CourseItem[]
  showWeekend: boolean
}

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
const dayAbbreviations = ["一", "二", "三", "四", "五", "六", "日"]

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

export function MobileTimetable({ courses, showWeekend }: MobileTimetableProps) {
  const groupedCourses = groupCoursesByDayAndTime(courses)
  const displayDays = showWeekend ? days : days.slice(0, 5)
  const displayDayAbbr = showWeekend ? dayAbbreviations : dayAbbreviations.slice(0, 5)

  return (
    <div className="lg:hidden">
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg overflow-hidden">
        <div className={`grid gap-0 ${showWeekend ? "grid-cols-8" : "grid-cols-6"} border-b border-white/50`}>
          <div className="p-2 text-center font-semibold text-xs text-slate-600 border-r border-white/50 bg-white/30">
          时间
          </div>
          {displayDays.map((day, index) => (
            <div
              key={day}
              className="p-2 text-center font-semibold text-xs text-slate-700 border-r border-white/50 last:border-r-0"
            >
              {displayDayAbbr[index]}
            </div>
          ))}
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {Array.from({ length: 12 }, (_, timeIndex) => (
            <div key={`mobile-time-${timeIndex}`} className={`grid gap-0 ${showWeekend ? "grid-cols-8" : "grid-cols-6"} border-t border-white/30`}>
              <div className="p-2 text-center text-xs font-mono text-slate-500 border-r border-white/50 bg-white/30">
                {timeIndex + 1}
              </div>
              {displayDays.map((day, dayIndex) => {
                const dayKey = (dayIndex + 1).toString()
                const timeKey = (timeIndex + 1).toString()
                const coursesInThisSlot = groupedCourses[dayKey]?.[timeKey] || []

                return (
                  <div
                    key={`mobile-${day}-${timeIndex}`}
                    className="min-h-[60px] p-1 border-r border-white/50 last:border-r-0"
                  >
                    {coursesInThisSlot.map((course) => (
                      <div key={course.seq} className="h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-200/50 p-1.5 hover:shadow-md transition-all duration-200">
                        <div className="space-y-1">
                          <h4 className="font-bold text-[10px] leading-tight text-slate-800 line-clamp-2">
                            {course.name}
                          </h4>
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1 text-[9px] text-slate-600">
                              <User className="w-2 h-2 text-blue-500" />
                              <span className="truncate">{course.teachers[0]?.name || ''}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[9px] text-slate-600">
                              <MapPin className="w-2 h-2 text-purple-500" />
                              <span className="truncate">{course.location.name}</span>
                            </div>
                          </div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}