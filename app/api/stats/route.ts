import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const [courseCount, subjectCount, departments] = await prisma.$transaction([
      prisma.course.count(),
      prisma.subject.count(),
      prisma.subject.findMany({
        select: { department: true },
        distinct: ['department']
      })
    ])

    const stats = {
      timestamp: new Date().toISOString(),
      data: {
        courses: courseCount,
        subjects: subjectCount,
        departments: departments.filter(dept => dept.department).length,
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        databaseConfigured: !!process.env.DATABASE_URL
      }
    }

    return NextResponse.json(stats, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    })
  } catch (error) {
    console.error('API Stats Error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to fetch statistics',
        timestamp: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}