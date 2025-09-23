import { NextRequest, NextResponse } from 'next/server'
import { verifyCaptcha } from '@/lib/server/captcha-service'


/**
 * POST /api/captcha/verify
 * 验证验证码
 */
export async function POST(request: NextRequest) {
  try {
    const { token, code } = await request.json()

    if (!token || !code) {
      return NextResponse.json(
        { error: '验证码和token不能为空' },
        { status: 400 }
      )
    }

    // 验证验证码
    const isValid = await verifyCaptcha(token, code)

    if (isValid) {
      return NextResponse.json({ valid: true })
    } else {
      return NextResponse.json(
        { valid: false, error: '验证码错误或已过期' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('验证验证码失败:', error)
    return NextResponse.json(
      { error: '验证验证码失败' },
      { status: 500 }
    )
  }
}