import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  getMostCommonSubjects,
  getMostPopularCourses,
  getDepartmentCourseDistribution,
  getCourseCategoryDistribution,
  getMostUsedLocations,
  getMostActiveTeachers
} from '@/lib/server/service/stats-service';

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');

    let data;

    if (type) {
      // 处理特定类型的统计数据请求
      switch (type) {
        case 'mostCommonSubjects':
          data = await getMostCommonSubjects(limit);
          break;
        case 'mostPopularCourses':
          data = await getMostPopularCourses(limit);
          break;
        case 'departmentDistribution':
          data = await getDepartmentCourseDistribution();
          break;
        case 'categoryDistribution':
          data = await getCourseCategoryDistribution();
          break;
        case 'mostUsedLocations':
          data = await getMostUsedLocations(limit);
          break;
        case 'mostActiveTeachers':
          data = await getMostActiveTeachers(limit);
          break;
        default:
          return NextResponse.json(
            { error: '不支持的统计类型' },
            { status: 400 }
          );
      }
    } else {
      // 返回所有统计数据
      const [
        courseCount, 
        subjectCount, 
        departments,
        mostCommonSubjects,
        mostPopularCourses,
        departmentDistribution,
        categoryDistribution,
        mostUsedLocations,
        mostActiveTeachers
      ] = await Promise.all([
        prisma.course.count(),
        prisma.subject.count(),
        prisma.subject.findMany({
          select: { department: true },
          distinct: ['department']
        }),
        getMostCommonSubjects(limit),
        getMostPopularCourses(limit),
        getDepartmentCourseDistribution(),
        getCourseCategoryDistribution(),
        getMostUsedLocations(limit),
        getMostActiveTeachers(limit)
      ]);

      data = {
        basic: {
          courses: courseCount,
          subjects: subjectCount,
          departments: departments.filter(dept => dept.department).length,
        },
        mostCommonSubjects,
        mostPopularCourses,
        departmentDistribution,
        categoryDistribution,
        mostUsedLocations,
        mostActiveTeachers
      };
    }

    const response = {
      timestamp: new Date().toISOString(),
      data,
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        databaseConfigured: !!process.env.DATABASE_URL
      }
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    })
  } catch (error) {
    console.error('API Stats Error:', error)
    
    return NextResponse.json(
      {
        error: '获取统计数据失败',
        timestamp: new Date().toISOString(),
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}