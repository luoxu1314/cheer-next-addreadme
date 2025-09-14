import { NextRequest, NextResponse } from 'next/server'
import { getFileByUrl } from '@/lib/server/image-service'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const file = await getFileByUrl(`/api/files/${params.filename}`)
    
    if (!file) {
      return NextResponse.json(
        { error: '文件不存在' },
        { status: 404 }
      )
    }

    return new NextResponse(file.blobData, {
      headers: {
        'Content-Type': file.mimeType,
        'Cache-Control': 'public, max-age=31536000',
        'Content-Disposition': `inline; filename="${file.originalName}"`,
      },
    })
  } catch (error) {
    console.error('获取文件错误:', error)
    return NextResponse.json(
      { error: '获取文件失败' },
      { status: 500 }
    )
  }
}