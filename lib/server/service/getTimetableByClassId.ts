import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'
import { parseCourseItemByLesson } from '@/lib/client/parseCourseItemByLesson'

export const getTimetableByClassId = unstable_cache(
    async (id: string, term?: string) => {
        // 查找该班级的所有课程
        const coursesRes = await prisma.course.findMany({
            where: {
                className: decodeURIComponent(id),
                term: term,
            },
            include: {
                lessons: {
                    include: {
                        location: {
                            select: {
                                id: true,
                                name: true,
                                building: true,
                            },
                        },
                        course: {
                            include: { subject: true },
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
                },
            },
        })

        // 获取所有可用的学期
        const terms = Array.from(
            new Set(coursesRes.map(course => course.term))
        ).sort((a, b) => b.localeCompare(a))

        const lessons = coursesRes.flatMap(e => e.lessons)
        const courses = lessons?.map(parseCourseItemByLesson)

        const owner = {
            name: decodeURIComponent(id),
            label: '班级',
        }

        return {
            courses,
            owner,
            terms,
        }
    },
    ['getTimetableByClassId'],
    {
        revalidate: 3600, // 缓存1小时
    }
)