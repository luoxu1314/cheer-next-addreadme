import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/server/auth'

const ADMIN_ROUTES = ['/api/admin']
const AUTH_ROUTES = ['/api/admin/login']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 只处理管理员API路由
  if (!ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // 登录接口不需要认证
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // 检查认证
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Missing authorization header' },
      { status: 401 }
    )
  }

  const token = authHeader.substring(7)
  const decoded = verifyToken(token)

  if (!decoded) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }

  // 将adminId添加到请求头中，供后续路由使用
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-admin-id', decoded.adminId)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/api/admin/:path*']
}