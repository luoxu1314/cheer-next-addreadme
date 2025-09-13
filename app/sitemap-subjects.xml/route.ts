import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const baseUrl = 'https://qike.site'
  
  try {
    // 限制学科数量
    const MAX_SUBJECTS_PER_SITEMAP = 5000
    
    const subjects = await prisma.subject.findMany({
      select: {
        id: true,
        name: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: MAX_SUBJECTS_PER_SITEMAP,
      where: {
        name: {
          not: '',
        },
      },
    })

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${subjects.map(subject => `
  <url>
    <loc>${baseUrl}/subjects/${encodeURIComponent(subject.id)}</loc>
    <lastmod>${subject.updatedAt.toISOString()}</lastmod>
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
    console.error('Error generating subjects sitemap:', error)
    
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