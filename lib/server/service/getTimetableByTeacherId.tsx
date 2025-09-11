import prisma from '@/lib/prisma'
import { Owner } from '@/lib/types/Owner'
import { parseCourseItemByLesson } from '@/lib/client/parseCourseItemByLesson'

export async function getTimetableByTeacherId(id: string, term?: string) {
  const [teacher, courses4Terms] = await prisma.$transaction([
    prisma.teacher.findUnique({
      where: {
        id: id,
      },
      include: {
        tuitions: {
          where: {
            lesson: {
              course: {
                term,
              },
            },
          },
          select: {
            lesson: {
              include: {
                location: {
                  select: {
                    id: true,
                    name: true,
                    building: true,
                  },
                },
                tuition: {
                  include: {
                    teacher: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                course: {
                  include: {
                    subject: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
    // todo: terms 还是抽出去吧，不然每次都会刷。
    prisma.course.findMany({
      distinct: ['term'],
      orderBy: {
        term: 'desc',
      },
      select: {
        term: true,
      },
      where: {
        lessons: {
          some: {
            tuition: {
              some: {
                teacherId: id,
              },
            },
          },
        },
      },
    }),
  ])

  const terms = courses4Terms.map((e: { term: string }) => e.term)

  const lessons = teacher?.tuitions
    .map((t: { lesson: any }) => t.lesson)
    .filter((lesson: { course: { term: string } }) => lesson.course.term === (term || terms[0]))

  const courses = lessons?.map(parseCourseItemByLesson)

  const owner: Owner = {
    name: teacher?.name,
    label: (teacher?.facultyName || '') + teacher?.title,
  }

  return { courses, owner, terms }
}
