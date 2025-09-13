import Link from 'next/link';
import { getDepartmentsAndProfessions } from '@/lib/server/service/profession';
import { Users } from 'lucide-react';
import { homeConfig } from "@/lib/config/home.config";

export async function DepartmentsSection() {
  // 获取院系和专业数据
  const departmentsData = await getDepartmentsAndProfessions();
  // 提取所有院系名称并排序
  const departments = Object.keys(departmentsData).sort().slice(0, 6); // 只显示前6个院系，引导用户到完整页面
  
  return (
    <section id="departments" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {homeConfig.departments.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {homeConfig.departments.subtitle}
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
                    <h3 className="text-xl font-bold text-foreground">{department}</h3>
                    <span className="bg-primary/10 text-primary font-medium rounded-full px-3 py-1 text-sm">
                      {professionCount}{homeConfig.departments.professionCount}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    点击查看该院系下的所有专业信息和课表
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm">
                    {homeConfig.departments.viewProfession}
                    <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 查看全部按钮 */}
        <div className="flex justify-center mt-10">
          <Link href="/department" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <Users className="w-5 h-5 mr-2" />
            {homeConfig.departments.viewAll}
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}