import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createAdmin(username: string, password: string) {
  const hashedPassword = await hashPassword(password)

  return prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  })
}

export async function authenticateAdmin(username: string, password: string) {
  const admin = await prisma.admin.findUnique({
    where: { username },
  })

  if (!admin) {
    return null
  }

  const isValid = await verifyPassword(password, admin.password)

  if (!isValid) {
    return null
  }

  return admin
}

export function generateToken(adminId: string): string {
  return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { adminId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { adminId: string }
  } catch {
    return null
  }
}

/**
 * 从请求头中验证管理员权限
 * @param request Next.js请求对象
 * @returns 管理员对象或null
 */
export async function authAdmin(request: Request): Promise<any | null> {
  try {
    // 从请求头中获取Authorization
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return null
    }
    
    // 提取JWT令牌
    const token = authHeader.replace('Bearer ', '')
    if (!token) {
      return null
    }
    
    // 验证令牌
    const decoded = verifyToken(token)
    if (!decoded) {
      return null
    }
    
    // 验证管理员存在
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId }
    })
    
    return admin
  } catch (error) {
    console.error('Admin authentication error:', error)
    return null
  }
}