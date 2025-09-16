import { NextResponse } from 'next/server';
import { getFilterOptions } from '@/lib/server/service/getFilterOptions';

/**
 * GET /api/filter-options
 * 获取课程查询页面的筛选选项数据
 */
export async function GET() {
  try {
    const filterOptions = await getFilterOptions();
    return NextResponse.json(filterOptions);
  } catch (error) {
    console.error('API: 获取筛选选项数据失败:', error);
    return NextResponse.json(
      { error: '获取筛选选项数据失败' },
      { status: 500 }
    );
  }
}