import { NextRequest, NextResponse } from 'next/server'
import { generateCaptcha, verifyCaptcha } from '@/lib/server/captcha-service'

/**
 * GET /api/captcha
 * 生成验证码
 */
export async function GET(request: NextRequest) {
  try {
    // 生成验证码
    const { token, pngBase64 } = await generateCaptcha()
    
    // 返回验证码图片和token
    return NextResponse.json({
      token,
      pngBase64
    })
  } catch (error) {
    console.error('生成验证码失败:', error)
    return NextResponse.json(
      { error: '生成验证码失败' },
      { status: 500 }
    )
  }
}

