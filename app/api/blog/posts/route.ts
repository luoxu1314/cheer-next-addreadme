import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts, createBlogPost } from '@/lib/server/blog-service'
import { verifyToken } from '@/lib/server/auth'

// GET /api/blog/posts - 获取博客文章列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const publishedParam = searchParams.get('published')
    const published = publishedParam === 'all' ? undefined : publishedParam !== 'false'
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const featured = searchParams.get('featured') === 'true' ? true : undefined

    const result = await getBlogPosts({
      published,
      limit,
      offset,
      // featured
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('获取博客文章列表错误:', error)
    return NextResponse.json(
      { error: '获取文章列表失败' },
      { status: 500 }
    )
  }
}

// POST /api/blog/posts - 创建新博客文章
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: '未提供认证token' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: '无效的认证token' },
        { status: 401 }
      )
    }

    const data = await request.json()
    
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: '标题、slug和内容不能为空' },
        { status: 400 }
      )
    }

    const post = await createBlogPost({
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      tags: data.tags || [],
      published: data.published || false,
      featured: data.featured || false,
      meta: data.meta || {}
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('创建博客文章错误:', error)
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    )
  }
}