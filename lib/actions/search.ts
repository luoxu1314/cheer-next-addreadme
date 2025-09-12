'use server';

import { searchOwner } from '@/lib/server/service/searchOwner';

export interface SearchResult {
  id: string;
  name: string;
  label?: string;
  type: string;
}

export async function searchAction(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const results = await searchOwner(query);
    const allResults: SearchResult[] = [];
    
    // 处理学生结果
    if (results[0] && Array.isArray(results[0])) {
      results[0].forEach((student: any) => {
        allResults.push({
          id: student.id,
          name: student.name || "未知姓名",
          label: student.className || student.professionName || "未知班级",
          type: "student"
        });
      });
    }
    
    // 处理教师结果
    if (results[1] && Array.isArray(results[1])) {
      results[1].forEach((teacher: any) => {
        allResults.push({
          id: teacher.id,
          name: teacher.name || "未知姓名",
          label: teacher.facultyName || "未知院系",
          type: "teacher"
        });
      });
    }
    
    // 处理教室结果
    if (results[2] && Array.isArray(results[2])) {
      results[2].forEach((location: any) => {
        allResults.push({
          id: location.id,
          name: location.name || "未知教室",
          label: location.building || "未知楼栋",
          type: "location"
        });
      });
    }
    
    // 处理专业结果
    if (results[3] && Array.isArray(results[3])) {
      results[3].forEach((profession: any) => {
        allResults.push({
          id: encodeURIComponent(profession.professionName),
          name: profession.professionName || "未知专业",
          label: `${profession.facultyName || "未知学院"} • ${profession.grade || "未知年级"}`,
          type: "profession"
        });
      });
    }
    return allResults;
  } catch (error) {
    console.error("搜索失败:", error);
    return [];
  }
}