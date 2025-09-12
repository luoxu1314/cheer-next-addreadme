"use client"

import { useState, useEffect, useMemo } from "react"
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
  courses?: CourseItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CourseDetailModal({ course, courses = [], open, onOpenChange }: CourseDetailModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentCourse = useMemo(() =>
    courses[currentIndex] || course
    , [currentIndex, courses, course])

  if (!currentCourse) return null

  const days = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"]

  // 处理滑动切换
  const handlePrev = () => {
    if (courses.length > 1) {
      setCurrentIndex(prev => (prev - 1 + courses.length) % courses.length)
    }
  }

  const handleNext = () => {
    if (courses.length > 1) {
      setCurrentIndex(prev => (prev + 1) % courses.length)
    }
  }

  // 重置索引当课程列表变化时
  useEffect(() => {
    setCurrentIndex(0)
  }, [courses])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">
            {currentCourse.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {currentCourse.courseId} · {currentCourse.category}
            {courses.length > 1 && (
              <span className="ml-2 text-xs opacity-70">
                {currentIndex + 1}/{courses.length}
              </span>
            )}
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
                  {days[currentCourse.slot.day]} {formatTimeRange(currentCourse.slot.rowIds)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-chart-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">上课地点</p>
                <p className="text-sm text-muted-foreground">{currentCourse.location.name}</p>
                <p className="text-xs text-muted-foreground/70">{currentCourse.location.building}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-chart-1 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">授课教师</p>
                <p className="text-sm text-muted-foreground">
                  {currentCourse.teachers.map(t => t.name).join("、")}
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
                <p className="text-sm font-medium text-foreground">{currentCourse.classId}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-chart-4" />
              <div>
                <p className="text-xs text-muted-foreground/70">人数</p>
                <p className="text-sm font-medium text-foreground">{currentCourse.studentCount}人</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground/70">周次</p>
                <p className="text-sm font-medium text-foreground">{currentCourse.weeks}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-destructive" />
              <div>
                <p className="text-xs text-muted-foreground/70">学分</p>
                <p className="text-sm font-medium text-foreground">{currentCourse.credit}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <Badge variant="outline" className="text-xs">
              {currentCourse.weekInterval}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-border">
          {courses.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handlePrev}
            >
              上一个
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className={courses.length > 1 ? "flex-1" : "w-full"}
            onClick={() => onOpenChange(false)}
          >
            关闭
          </Button>
          {courses.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleNext}
            >
              下一个
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// 用于课程卡片的点击包装器
export function CourseClickWrapper({
  children,
  course,
  courses = []
}: {
  children: React.ReactNode
  course: CourseItem
  courses?: CourseItem[]
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
        courses={courses.length > 0 ? courses : [course]}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}