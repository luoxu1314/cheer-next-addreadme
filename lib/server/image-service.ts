import sharp from 'sharp'
import prisma from '@/lib/prisma'
import { randomUUID } from 'crypto'

export interface ImageUploadOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

export async function processAndStoreImage(
  buffer: Buffer,
  originalName: string,
  options: ImageUploadOptions = {}
): Promise<{
  id: string
  url: string
  width: number
  height: number
  size: number
  filename: string
}> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 85
  } = options

  // 使用sharp处理图片
  const processedBuffer = await sharp(buffer)
    .resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality })
    .toBuffer()

  // 获取图片元数据
  const metadata = await sharp(processedBuffer).metadata()
  
  const filename = `${randomUUID()}.webp`
  const url = `/api/files/${filename}`

  // 保存到数据库
  const fileRecord = await prisma.file.create({
    data: {
      filename,
      originalName,
      mimeType: 'image/webp',
      size: processedBuffer.length,
      blobData: processedBuffer,
      url,
      width: metadata.width,
      height: metadata.height,
    },
  })

  return {
    id: fileRecord.id,
    url,
    width: metadata.width || 0,
    height: metadata.height || 0,
    size: processedBuffer.length,
    filename,
  }
}

export async function getFileByUrl(url: string) {
  const filename = url.split('/').pop()
  if (!filename) return null

  return prisma.file.findUnique({
    where: { url: `/api/files/${filename}` }
  })
}

export async function getFileById(id: string) {
  return prisma.file.findUnique({
    where: { id }
  })
}