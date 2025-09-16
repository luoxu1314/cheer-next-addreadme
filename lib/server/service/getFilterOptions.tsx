import prisma from '@/lib/prisma';

/**
 * 获取课程查询页面的筛选选项数据
 * 包括：所有院系、所有课程类别、所有学分数值
 */
export async function getFilterOptions() {
  try {
    // 使用事务同时获取所有数据，提高效率
    const [departments, categories, credits] = await prisma.$transaction([
      // 获取所有院系
      prisma.subject.findMany({
        distinct: ['department'],
        select: { department: true },
        where: { department: { not: '' } }
      }),
      
      // 获取所有课程类别
      prisma.subject.findMany({
        distinct: ['category'],
        select: { category: true },
        where: { category: { not: '' } }
      }),
      
      // 获取所有学分数值
      prisma.subject.findMany({
        distinct: ['credit'],
        select: { credit: true }
      })
    ]);

    return {
      departments: departments.map(d => d.department).sort(),
      categories: categories.map(c => c.category).sort(),
      credits: credits.map(c => c.credit).sort((a, b) => a - b)
    };
  } catch (error) {
    console.error('获取筛选选项数据失败:', error);
    // 发生错误时返回空数组
    return {
      departments: [],
      categories: [],
      credits: []
    };
  }
}