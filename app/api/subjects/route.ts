import { NextResponse } from 'next/server';
import { getSubjects } from '@/lib/server/service/getSubjects';

/**
 * GET /api/subjects
 * 获取课程数据
 * 查询参数：q（搜索关键词）、departmentName（院系）、publicElectiveOnly（是否仅公共选修课）、credit（学分）、category（课程类别）、page（页码）、pageSize（每页数量）
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    
    // 从查询参数中获取筛选条件
    const q = searchParams.get('q') || '';
    const departmentName = searchParams.get('departmentName') || '';
    const publicElectiveOnly = searchParams.get('publicElectiveOnly') || 'false';
    const credit = searchParams.get('credit') ? Number(searchParams.get('credit')) : undefined;
    const category = searchParams.get('category') || '';
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const pageSize = searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : 10;
    
    // 计算偏移量
    const offset = (page - 1) * pageSize;
    
    // 调用服务获取课程数据 - 显式处理参数类型
    const [subjects, total, _] = await getSubjects(
      q,                   // 搜索关键词
      departmentName,      // 院系名称
      { offset, pageSize }, // 分页信息
      publicElectiveOnly.toString(), // 确保是字符串类型
      credit,              // 学分
      category             // 课程类别
    );
    
    // 返回分页数据
    return NextResponse.json({
      subjects,
      total,
      page,
      pageSize,
      totalPages: total !== undefined ? Math.ceil(Number(total) / Number(pageSize)) : 0
    });
  } catch (error) {
    console.error('API: 获取课程数据失败:', error);
    return NextResponse.json(
      { error: '获取课程数据失败' },
      { status: 500 }
    );
  }
}