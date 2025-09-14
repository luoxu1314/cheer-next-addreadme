import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const tags = await prisma.blogPost.groupBy({
      by: ['tags'],
      _count: {
        tags: true
      },
      where: {
        published: true
      }
    })

    // 处理标签数据
    const tagCounts: Record<string, number> = {}
    
    tags.forEach((item) => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + item._count.tags
        })
      }
    })

    // 转换为数组并排序
    const sortedTags = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20) // 限制前20个标签

    return NextResponse.json({ tags: sortedTags })
  } catch (error) {
    console.error('获取标签失败:', error)
    return NextResponse.json(
      { error: '获取标签失败' },
      { status: 500 }
    )
  }
}