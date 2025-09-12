"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, MapPin, Clock, BookOpen, Users, Calendar, CreditCard } from "lucide-react"
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

interface CourseDetailModalProps {
  course: CourseItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CourseDetailModal({ course, open, onOpenChange }: CourseDetailModalProps) {
  if (!course) return null

  const days = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">
            {course.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {course.courseId} · {course.category}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 基本信息 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-chart-5 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">上课时间</p>
                <p className="text-sm text-muted-foreground">
                  {days[course.slot.day]} {formatTimeRange(course.slot.rowIds)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-chart-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">上课地点</p>
                <p className="text-sm text-muted-foreground">{course.location.name}</p>
                <p className="text-xs text-muted-foreground/70">{course.location.building}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-chart-1 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">授课教师</p>
                <p className="text-sm text-muted-foreground">
                  {course.teachers.map(t => t.name).join("、")}
                </p>
              </div>
            </div>
          </div>

          {/* 课程详情 */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-chart-4" />
              <div>
                <p className="text-xs text-muted-foreground/70">班级</p>
                <p className="text-sm font-medium text-foreground">{course.classId}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-chart-4" />
              <div>
                <p className="text-xs text-muted-foreground/70">人数</p>
                <p className="text-sm font-medium text-foreground">{course.studentCount}人</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground/70">周次</p>
                <p className="text-sm font-medium text-foreground">{course.weeks}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-destructive" />
              <div>
                <p className="text-xs text-muted-foreground/70">学分</p>
                <p className="text-sm font-medium text-foreground">{course.credit}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <Badge variant="outline" className="text-xs">
              {course.weekInterval}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            关闭
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// 用于课程卡片的点击包装器
export function CourseClickWrapper({ 
  children, 
  course 
}: { 
  children: React.ReactNode
  course: CourseItem 
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div 
        className="cursor-pointer active:scale-95 transition-transform duration-150" 
        onClick={() => setOpen(true)}
      >
        {children}
      </div>
      <CourseDetailModal 
        course={course} 
        open={open} 
        onOpenChange={setOpen} 
      />
    </>
  )
}