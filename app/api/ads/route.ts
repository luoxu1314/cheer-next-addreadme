import { NextRequest, NextResponse } from 'next/server'
import { getActiveAds } from '@/lib/server/ad-service'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const { ads } = await getActiveAds({ limit, offset })

    return NextResponse.json({ ads })
  } catch (error) {
    console.error('Failed to fetch ads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ads' },
      { status: 500 }
    )
  }
}