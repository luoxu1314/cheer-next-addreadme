import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Clock } from "lucide-react"
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

interface CourseCardProps {
  course: CourseItem
  className?: string
}



export function CourseCard({ course, className = "" }: CourseCardProps) {
  return (
    <Card 
      className={`h-full p-3 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-card/80 backdrop-blur-sm border border-border/60 shadow-lg ${className}`}
    >
      <div className="space-y-2">
        <h3 className="font-bold text-sm leading-tight text-balance text-foreground line-clamp-2">
          {course.name}
        </h3>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="w-3 h-3 text-blue-500 flex-shrink-0" />
            <span className="font-medium truncate">
              {course.teachers[0]?.name || ''}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 text-purple-500 flex-shrink-0" />
            <span className="truncate">{course.location.name}</span>
          </div>
        </div>

        <Badge variant="outline" className="text-[10px] px-1.5 py-0" title={course.weeks}>
          <span className="truncate">{course.category}</span>
        </Badge>
      </div>
    </Card>
  )
}

export function MobileCourseCard({ course }: CourseCardProps) {
  return (
    <div className="h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-200/50 p-1.5 hover:shadow-md transition-all duration-200">
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
            <span className="truncate">{course.weeks}</span>
          </div>
        </div>
        <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto"></div>
      </div>
    </div>
  )
}