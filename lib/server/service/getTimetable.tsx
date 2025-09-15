import { mergeSameCourse } from '@/lib/utils'
import { CourseItem } from '@/lib/types/CourseItem'
import { OwnerType } from '@/lib/types/Owner'
import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'
import { getTimetableByLocationId } from './getTimetableByLocationId'
import { getTimetableByStudentId } from './getTimetableByStudentId'
import { getTimetableByTeacherId } from './getTimetableByTeacherId'
import { getTimetableByClassId } from './getTimetableByClassId'

export const getTimetable = unstable_cache(
  async (
    type = OwnerType.student,
    id: string,
    term?: string,
    grade?: string
  ) => {
    // todo: 如果没有 term，寻找缺省的 term
    // 这一层抽成 service
    // getScheduleMeta
    // getSchedule
    // 看看next官方有没有新的关于目录结构的指南
    const fnMapping = {
      [OwnerType.teacher]: getTimetableByTeacherId,
      [OwnerType.student]: getTimetableByStudentId,
      [OwnerType.location]: getTimetableByLocationId,
      [OwnerType.profession]: getTimetableByProfessionName,
      [OwnerType.class]: getTimetableByClassId,
    } as const
    // 根据类型调用不同的函数，并传递正确的参数
    const result = await fnMapping[type as keyof typeof fnMapping](id, term, grade);
    const { courses, owner, terms } = result;
    // 确保grades存在，如果不存在则设为空数组
    const grades = 'grades' in result ? result.grades : [];

    return JSON.parse(
      JSON.stringify({
        courses: mergeSameCourse(courses as CourseItem[]),
        owner,
        terms:
          terms ||
          Array.from(
            new Set((courses as CourseItem[]).map((e) => e.term))
          )?.sort((a: string, b: string) => b.localeCompare(a)),
        grades
      })
    )
  }
)

export const getTimetableByProfessionName = unstable_cache(
  async (id: string, term?: string, grade?: string) => {
    // 从ID中分离专业名称和年级
    let professionName = decodeURIComponent(id);
    let parsedGrade = grade;

    // 如果ID中包含'-'，则尝试从中解析年级
    if (id.includes('-')) {
      const parts = id.split('-');
      const lastPart = parts[parts.length - 1];
      // 检查最后一部分是否为有效的年级格式（如2020、2021等）
      if (/^20\d{2}$/.test(lastPart)) {
        parsedGrade = lastPart;
        professionName = decodeURIComponent(parts.slice(0, -1).join('-'));
      }
    }

    const student = await prisma.student.findFirstOrThrow({
      where: {
        professionName,
        grade: parsedGrade,
      },
      orderBy: {
        grade: 'desc',
      },
    })

    const grades = await prisma.student.findMany({
      where: {
        professionName,
      },
      select: {
        grade: true,
      },
      orderBy: {
        grade: 'desc',
      },
      distinct: 'grade',
    })

    const owner = {
      name: professionName + '专业',
      label: "",
    }

    const { terms, courses } = await getTimetableByStudentId(student?.id, term)

    return {
      courses,
      owner,
      terms:
        terms ||
        (Array.from(new Set(courses?.map((e) => e.term)))?.sort(
          (a: string, b: string) => b.localeCompare(a)
        ) as string[]),

      grades: grades.map((e) => e.grade),
    }
  }
)
