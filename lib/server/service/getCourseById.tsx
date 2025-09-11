import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'

export default unstable_cache(async function getCourseById(id: string) {
  return await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      subject: true,
      lessons: {
        include: {
          location: true,
          tuition: {
            include: {
              teacher: true,
            },
          },
          course: {
            include: {
              subject: true,
            },
          },
        },
      },
      enrollments: {
        include: {
          student: true,
        },
      },
    },
  })
})
