import { v4 as uuidv4 } from 'uuid'
import prisma from '@/lib/prisma'
import { getConfigValue } from './config-service'
import * as pureimage from 'pureimage'
import { Writable } from 'stream'
import * as path from 'path'

/**
 * 生成随机验证码字符串
 * @param length 验证码长度
 * @returns 随机验证码字符串
 */
function generateRandomCode(length: number): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

/**
 * 将pureimage生成的图像转换为Base64编码的PNG
 * @param img 图像对象
 * @returns Base64编码的PNG字符串
 */
async function imageToBase64(img: any): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // 创建一个内存流来捕获PNG数据
      const chunks: Buffer[] = []
      const stream = new Writable({
        write(chunk: Buffer, encoding: string, callback: Function) {
          chunks.push(chunk)
          callback()
        }
      })

      stream.on('finish', () => {
        const buffer = Buffer.concat(chunks)
        const base64 = buffer.toString('base64')
        resolve(`data:image/png;base64,${base64}`)
      })

      stream.on('error', reject)

      // 将图像编码到流中
      pureimage.encodePNGToStream(img, stream).catch(reject)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 生成验证码
 * @returns 验证码token和Base64编码的PNG图片
 */
export async function generateCaptcha(): Promise<{ token: string; pngBase64: string }> {
  try {
    // 从配置中获取验证码设置
    const enabled = await getConfigValue('security.enableCaptcha', true)
    const length = await getConfigValue('security.captchaLength', 4)
    const expiry = await getConfigValue('security.captchaExpiry', 300) // 秒

    if (!enabled) {
      throw new Error('验证码功能未启用')
    }

    // 生成随机验证码
    const code = generateRandomCode(length).toLowerCase()
    const token = uuidv4()
    const expiresAt = new Date(Date.now() + expiry * 1000)

    // 创建图像
    const img = pureimage.make(150, 50)
    const ctx = img.getContext('2d')

    // 填充背景色
    ctx.fillStyle = '#f4f4f4'
    ctx.fillRect(0, 0, 150, 50)

    // 添加干扰线（减少数量和强度以提高可读性）
    for (let i = 0; i < 2; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 80 + 30}, ${Math.random() * 80 + 30}, ${Math.random() * 80 + 30}, 0.3)`
      ctx.beginPath()
      ctx.moveTo(Math.random() * 150, Math.random() * 50)
      ctx.lineTo(Math.random() * 150, Math.random() * 50)
      ctx.stroke()
    }

    // 添加噪点（减少数量以提高可读性）
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 80 + 30}, ${Math.random() * 80 + 30}, ${Math.random() * 80 + 30}, 0.2)`
      ctx.beginPath()
      ctx.arc(Math.random() * 150, Math.random() * 50, 1, 0, Math.PI * 2)
      ctx.fill()
    }

    // 设置字体属性
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#000000' // 使用纯黑色以提高可读性

    // 注册和加载字体
    let fontLoaded = false
    try {
      // 1. 尝试注册并加载字体 - 这是推荐的方式
      // 注意：您需要在 public/fonts 目录下提供一个实际的字体文件
      // 可以从网上下载一个开源的 TrueType 字体文件，如 Arial.ttf 或其他无版权字体
      const fontPath = path.resolve(process.cwd(), 'public', 'fonts', 'SourceSansPro-Regular.ttf')
      const font = pureimage.registerFont(fontPath, 'Arial')
      font.loadSync()
      fontLoaded = true
      console.log('字体加载成功')
    } catch (err) {
      console.error('字体文件加载失败，请确保在 public/fonts 目录下提供 Arial.ttf 字体文件:', err)
    }

    // 2. 如果字体加载失败，我们会尝试使用纯image内置的字体处理
    // 这是一个后备方案，不保证字体样式

    // 将验证码分散显示，调整参数以提高可读性
    const chars = code.split('')
    chars.forEach((char, index) => {
      // 减小随机旋转角度范围
      const angle = (Math.random() - 0.5) * 0.3 // -0.15 到 0.15 弧度
      const x = 30 + index * 25
      const y = 25 + (Math.random() - 0.5) * 5 // 减小上下随机偏移

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      
      try {
        if (fontLoaded) {
          // 如果字体加载成功，使用注册的字体
          ctx.font = '28px Arial'
          ctx.fillText(char, 0, 0)
        } else {
          // 如果字体加载失败，尝试使用最基本的字体设置
          // 这是一个简化的后备方案
          ctx.font = '28px'
          ctx.fillText(char, 0, 0)
        }
      } catch (error) {
        console.error('字体渲染错误:', error)
        // 终极降级方案：使用简单的矩形表示字符
        ctx.fillRect(-10, -14, 20, 28)
        // 在矩形中添加一些线条以区分不同字符
        const lineCount = Math.floor(Math.random() * 2) + 1
        for (let i = 0; i < lineCount; i++) {
          ctx.beginPath()
          ctx.moveTo(-8, (-10 + i * 10))
          ctx.lineTo(8, (-10 + i * 10))
          ctx.stroke()
        }
      }
      
      ctx.restore()
    })

    // 将图像转换为Base64编码的PNG
    const pngBase64 = await imageToBase64(img)

    // 存储验证码信息到数据库
    await prisma.captcha.create({
      data: {
        token,
        code,
        expiresAt
      }
    })

    // 清理过期的验证码
    await cleanupExpiredCaptchas()

    return {
      token,
      pngBase64 // 返回Base64编码的PNG
    }
  } catch (error) {
    console.error('生成验证码失败:', error)
    throw error
  }
}

/**
 * 验证验证码
 * @param token 验证码token
 * @param code 用户输入的验证码
 * @returns 验证结果
 */
export async function verifyCaptcha(token: string, code: string): Promise<boolean> {
  try {
    if (!token || !code) {
      return false
    }

    // 从数据库获取验证码
    const captcha = await prisma.captcha.findUnique({
      where: { token }
    })

    if (!captcha) {
      return false
    }

    // 检查验证码是否过期
    const now = new Date()
    if (now > captcha.expiresAt) {
      // 删除过期的验证码
      await prisma.captcha.delete({ where: { token } })
      return false
    }

    // 验证验证码
    const isValid = captcha.code === code.toLowerCase()

    // 无论验证成功与否，都删除验证码，防止重用
    await prisma.captcha.delete({ where: { token } })

    return isValid
  } catch (error) {
    console.error('验证验证码失败:', error)
    return false
  }
}

/**
 * 清理过期的验证码
 */
export async function cleanupExpiredCaptchas(): Promise<void> {
  try {
    await prisma.captcha.deleteMany({
      where: {
        expiresAt: { lte: new Date() }
      }
    })
  } catch (error) {
    console.error('清理过期验证码失败:', error)
  }
}

/**
 * 检查验证码功能是否启用
 * @returns 是否启用
 */
export async function isCaptchaEnabled(): Promise<boolean> {
  return getConfigValue('security.enableCaptcha', true)
}