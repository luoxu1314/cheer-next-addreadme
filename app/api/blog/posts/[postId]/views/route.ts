import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params

    // 更新浏览量
    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        views: {
          increment: 1
        }
      },
      select: {
        views: true
      }
    })

    return NextResponse.json({ views: updatedPost.views })
  } catch (error) {
    console.error('更新浏览量失败:', error)
    return NextResponse.json(
      { error: '更新浏览量失败' },
      { status: 500 }
    )
  }
}