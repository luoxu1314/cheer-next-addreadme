import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const baseUrl = 'https://qike.site'
  
  try {
    const departments = await prisma.subject.findMany({
      select: {
        department: true,
      },
      distinct: ['department'],
      where: {
        department: {
          not: '',
        },
      },
    })

    const validDepartments = departments.filter(dept => dept.department && dept.department.trim() !== '')

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${validDepartments.map(dept => `
  <url>
    <loc>${baseUrl}/department/${encodeURIComponent(dept.department!)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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
    console.error('Error generating departments sitemap:', error)
    
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