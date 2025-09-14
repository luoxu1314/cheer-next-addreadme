import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts } from '@/lib/server/blog-service'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10

    if (!query.trim()) {
      return NextResponse.json(
        { error: '搜索关键词不能为空' },
        { status: 400 }
      )
    }

    const offset = (page - 1) * limit
    const result = await getBlogPosts({
      published: true,
      search: query,
      limit,
      offset
    })

    return NextResponse.json({
      posts: result.posts,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit)
    })
  } catch (error) {
    console.error('搜索文章失败:', error)
    return NextResponse.json(
      { error: '搜索文章失败' },
      { status: 500 }
    )
  }
}