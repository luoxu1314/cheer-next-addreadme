import prisma from '@/lib/prisma';

/**
 * 获取开课次数最多的课程统计
 * @param limit 返回的课程数量
 * @returns 课程名称和开课次数的统计数据
 */
export async function getMostCommonSubjects(limit: number = 10) {
    const subjects = await prisma.subject.findMany({
        take: limit,
        orderBy: {
            courses: { _count: 'desc' }
        },
        select: {
            id: true,
            name: true,
            department: true,
            _count: {
                select: { courses: true }
            },
        }
    });

    return subjects.map(subject => ({
        id: subject.id,
        name: subject.name,
        department: subject.department,
        count: subject._count.courses
    }));
}

/**
 * 获取最受欢迎的课程(按选课人数)
 * @param limit 返回的课程数量
 * @returns 课程名称和选课人数的统计数据
 */
export async function getMostPopularCourses(limit: number = 10) {
    const courses = await prisma.course.findMany({
        take: limit,
        orderBy: {
            electCount: 'desc'
        },
        include: {
            subject: { select: { name: true, department: true } }
        },
        where: {
            electCount: { not: 0 }
        }
    });

    return courses.map(course => ({
        id: course.id,
        name: course.subject.name,
        department: course.subject.department,
        className: course.className,
        term: course.term,
        studentCount: course.electCount
    }));
}

/**
 * 获取各院系课程数量分布
 * @returns 院系名称和课程数量的统计数据
 */
export async function getDepartmentCourseDistribution() {
    const departments = await prisma.subject.groupBy({
        by: ['department'],
        _count: true,
        orderBy: {
            department: 'desc'
        },
        where: {
            department: { not: '' }
        }
    });

    return departments.map(dept => ({
        name: dept.department,
        count: dept._count
    }));
}

/**
 * 获取各课程类别分布
 * @returns 课程类别和数量的统计数据
 */
export async function getCourseCategoryDistribution() {
    const categories = await prisma.subject.groupBy({
        by: ['category'],
        _count: true,
        orderBy: {
            category: 'desc'
        },
        where: {
            category: { not: '' }
        }
    });

    return categories.map(cat => ({
        name: cat.category,
        count: cat._count
    }));
}

/**
 * 获取教室使用情况统计
 * @param limit 返回的教室数量
 * @returns 教室名称和使用次数的统计数据
 */
export async function getMostUsedLocations(limit: number = 10) {
    const locations = await prisma.location.findMany({
        take: limit,
        orderBy: {
            lessons: { _count: 'desc' }
        },
        select: {
            id: true,
            name: true,
            campus: true,
            building: true,
            _count: { select: { lessons: true } }
        },
        where: {
            // 排除默认教室ID "00default"
            id: { not: "00default" }
        }
    });

    return locations.map(location => ({
        id: location.id,
        name: location.name,
        campus: location.campus,
        building: location.building,
        count: location._count.lessons
    }));
}

/**
 * 获取教师授课情况统计
 * @param limit 返回的教师数量
 * @returns 教师名称和授课次数的统计数据
 */
export async function getMostActiveTeachers(limit: number = 10) {
    const teachers = await prisma.teacher.findMany({
        take: limit,
        orderBy: {
            tuitions: { _count: 'desc' }
        },
        select: {
            id: true,
            name: true,
            facultyName: true,
            _count: { select: { tuitions: true } }
        }
    });

    return teachers.map(teacher => ({
        id: teacher.id,
        name: teacher.name,
        facultyName: teacher.facultyName,
        count: teacher._count.tuitions
    }));
}

/**
 * 获取使用频率最低的教室统计
 * @param limit 返回的教室数量
 * @returns 教室名称和使用次数的统计数据
 */
export async function getLeastUsedLocations(limit: number = 10) {
    const locations = await prisma.location.findMany({
        take: limit,
        orderBy: {
            lessons: { _count: 'asc' } // 升序排列，获取使用频率最低的
        },
        select: {
            id: true,
            name: true,
            campus: true,
            building: true,
            _count: { select: { lessons: true } }
        },
        where: {
            // 排除默认教室ID "00default"和没有课程的教室
            id: { not: "00default" },
            lessons: { some: {} }
        }
    });

    return locations.map(location => ({
        id: location.id,
        name: location.name,
        campus: location.campus,
        building: location.building,
        count: location._count.lessons
    }));
}

/**
 * 获取最受欢迎的公选课
 * @param limit 返回的课程数量
 * @returns 公选课名称和选课人数的统计数据
 */
export async function getMostPopularElectiveCourses(limit: number = 10) {
    const courses = await prisma.course.findMany({
        take: limit,
        orderBy: {
            electCount: 'desc'
        },
        include: {
            subject: {
                select: { name: true, department: true, category: true }
            }
        },
        where: {
            electCount: { not: 0 },
            // 使用subject.id包含'-'来筛选公选课，参考getSubjects中的实现
            subject: {
                id: {
                    contains: '-'
                }
            }
        }
    });

    return courses.map(course => ({
        id: course.id,
        name: course.subject.name,
        department: course.subject.department,
        category: course.subject.category,
        className: course.className,
        term: course.term,
        studentCount: course.electCount,
        // teachers: course.teachers,
        // location: course.location
    }));
}