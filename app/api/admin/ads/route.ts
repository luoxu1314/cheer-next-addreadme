import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllAds, 
  createAd, 
  updateAd, 
  deleteAd, 
  checkExpiredAds 
} from '@/lib/server/ad-service'

export async function GET(request: NextRequest) {
  try {

    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '10'), 1), 100)
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0)
    const status = searchParams.get('status') || 'all'

    // 验证status参数
    const validStatuses = ['all', 'pending', 'active', 'expired', 'rejected']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status parameter' }, 
        { status: 400 }
      )
    }

    const { ads, total } = await getAllAds({ limit, offset, status })

    return NextResponse.json({ 
      ads, 
      total, 
      limit, 
      offset,
      hasMore: offset + limit < total 
    })
  } catch (error) {
    console.error('Failed to fetch ads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ads' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {

    const body = await request.json()
    
    // 验证必填字段
    const requiredFields = ['title', 'content', 'adClient', 'adContact', 'adStartDate', 'adDuration', 'adPrice']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // 验证数据格式和范围
    if (typeof body.title !== 'string' || body.title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title must be a non-empty string' },
        { status: 400 }
      )
    }

    if (typeof body.content !== 'string' || body.content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content must be a non-empty string' },
        { status: 400 }
      )
    }

    const adDuration = parseInt(body.adDuration)
    if (isNaN(adDuration) || adDuration < 1 || adDuration > 12) {
      return NextResponse.json(
        { error: 'Duration must be between 1 and 12 months' },
        { status: 400 }
      )
    }

    const adPrice = parseInt(body.adPrice)
    if (isNaN(adPrice) || adPrice < 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      )
    }

    const adStartDate = new Date(body.adStartDate)
    if (isNaN(adStartDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid start date format' },
        { status: 400 }
      )
    }

    // 生成唯一的slug
    const slug = `ad-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
    
    const ad = await createAd({
      ...body,
      slug,
      adStartDate,
      adDuration,
      adPrice
    })

    return NextResponse.json({ ad }, { status: 201 })
  } catch (error) {
    console.error('Failed to create ad:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Ad with this title already exists' },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create ad' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing ad ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // 验证可选字段
    if (body.title !== undefined) {
      if (typeof body.title !== 'string' || body.title.trim().length === 0) {
        return NextResponse.json(
          { error: 'Title must be a non-empty string' },
          { status: 400 }
        )
      }
    }

    if (body.content !== undefined) {
      if (typeof body.content !== 'string' || body.content.trim().length === 0) {
        return NextResponse.json(
          { error: 'Content must be a non-empty string' },
          { status: 400 }
        )
      }
    }

    if (body.adDuration !== undefined) {
      const adDuration = parseInt(body.adDuration)
      if (isNaN(adDuration) || adDuration < 1 || adDuration > 12) {
        return NextResponse.json(
          { error: 'Duration must be between 1 and 12 months' },
          { status: 400 }
        )
      }
      body.adDuration = adDuration
    }

    if (body.adPrice !== undefined) {
      const adPrice = parseInt(body.adPrice)
      if (isNaN(adPrice) || adPrice < 0) {
        return NextResponse.json(
          { error: 'Price must be a positive number' },
          { status: 400 }
        )
      }
      body.adPrice = adPrice
    }

    if (body.adStartDate !== undefined) {
      const adStartDate = new Date(body.adStartDate)
      if (isNaN(adStartDate.getTime())) {
        return NextResponse.json(
          { error: 'Invalid start date format' },
          { status: 400 }
        )
      }

      body.adStartDate = adStartDate
    }

    if (body.adStatus !== undefined) {
      const validStatuses = ['pending', 'active', 'expired', 'rejected']
      if (!validStatuses.includes(body.adStatus)) {
        return NextResponse.json(
          { error: 'Invalid status value' },
          { status: 400 }
        )
      }
    }

    const ad = await updateAd(id, body)

    return NextResponse.json({ ad })
  } catch (error) {
    console.error('Failed to update ad:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('Record to update not found')) {
        return NextResponse.json(
          { error: 'Ad not found' },
          { status: 404 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to update ad' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing ad ID' },
        { status: 400 }
      )
    }

    // 验证ID格式
    if (!/^[a-zA-Z0-9-]+$/.test(id)) {
      return NextResponse.json(
        { error: 'Invalid ad ID format' },
        { status: 400 }
      )
    }

    await deleteAd(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete ad:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('Record to delete does not exist')) {
        return NextResponse.json(
          { error: 'Ad not found' },
          { status: 404 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to delete ad' },
      { status: 500 }
    )
  }
}

// 检查过期广告
export async function PATCH(request: NextRequest) {
  try {

    const count = await checkExpiredAds()

    return NextResponse.json({ 
      count, 
      message: `Updated ${count} expired ads`,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Failed to check expired ads:', error)
    return NextResponse.json(
      { error: 'Failed to check expired ads' },
      { status: 500 }
    )
  }
}