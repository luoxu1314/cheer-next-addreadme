import prisma from '@/lib/prisma'

export async function getLessonByIds(ids: any[]) {
  return await prisma.lesson.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include: {
      location: {
        select: {
          id: true,
          name: true,
          building: true,
        },
      },
      course: {
        include: {
          subject: true,
        },
      },
      tuition: {
        include: {
          teacher: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })
}