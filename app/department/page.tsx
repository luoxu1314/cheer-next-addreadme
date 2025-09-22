import { Metadata } from 'next';
import Link from 'next/link';
import { getDepartmentsAndProfessions } from '@/lib/server/service/profession';

// 生成页面元数据
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '院系列表',
    description: '中南大学各院系和专业信息列表，方便查询各专业课程表',
    keywords: ['中南大学', '院系', '专业', '课程表', '绮课'],
  };
}

// 主页面组件
export default async function DepartmentsPage() {
  // 获取院系和专业数据
  const departmentsData = await getDepartmentsAndProfessions();
  // 提取所有院系名称并排序
  const departments = Object.keys(departmentsData).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/5 to-secondary/5 relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,var(--chart-3)/30,transparent_50%),radial-gradient(circle_at_80%_20%,var(--chart-5)/30,transparent_50%),radial-gradient(circle_at_40%_40%,var(--chart-1)/20,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,white/60)] opacity-30"></div>
      
      <div className="relative w-full max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
        {/* 页面标题 */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary   to-secondary bg-clip-text text-transparent">
            院系列表
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            选择您感兴趣的院系，查看该院系下的所有专业，进一步查询专业课表
          </p>
        </div>

        {/* 院系卡片列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => {
            // 计算该院系下的专业数量
            const professionCount = departmentsData[department].length;
            
            return (
              <Link
                key={department}
                href={`/department/${encodeURIComponent(department)}`}
                className="group"
              >
                <div className="bg-card backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:translate-y-[-4px]">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">{department}</h2>
                    <span className="bg-primary/10 text-primary font-medium rounded-full px-3 py-1 text-sm">
                      {professionCount}个专业
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    点击查看该院系下的所有专业信息和课表
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm">
                    查看专业列表
                    <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}