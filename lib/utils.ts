import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CourseItem } from '@/lib/types/CourseItem'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mergeSameCourse(courses: CourseItem[]): CourseItem[] {
  const courseMap = new Map<string, CourseItem>()
  
  for (const course of courses) {
    const key = `${course.courseId}-${course.name}-${course.slot.day}-${course.slot.rowIds.join(',')}`
    
    if (courseMap.has(key)) {
      const existing = courseMap.get(key)!
      // 合并教师信息
      const existingTeachers = existing.teachers.map(t => t.id)
      const newTeachers = course.teachers.filter(t => !existingTeachers.includes(t.id))
      existing.teachers = [...existing.teachers, ...newTeachers]
    } else {
      courseMap.set(key, { ...course })
    }
  }
  
  return Array.from(courseMap.values())
}
