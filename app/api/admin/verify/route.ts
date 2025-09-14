import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/server/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: '未提供token' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json(
        { error: '无效的token' },
        { status: 401 }
      )
    }

    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error('验证token错误:', error)
    return NextResponse.json(
      { error: '验证失败' },
      { status: 500 }
    )
  }
}