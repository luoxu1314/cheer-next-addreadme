import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const baseUrl = 'https://qike.site'
  
  try {
    // 限制课程数量，避免单个 sitemap 文件过大
    const MAX_COURSES_PER_SITEMAP = 10000
    
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: MAX_COURSES_PER_SITEMAP,
    })

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${courses.map(course => `
  <url>
    <loc>${baseUrl}/course/${course.id}</loc>
    <lastmod>${course.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`).join('')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Error generating courses sitemap:', error)
    
    // 返回空 sitemap
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`
    
    return new NextResponse(emptySitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }
}

export const revalidate = 3600