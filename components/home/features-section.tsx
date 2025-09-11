import { Check, Smartphone, Zap, Shield, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "响应式设计",
    description: "完美适配手机、平板、电脑等各种设备，随时随地查看课表"
  },
  {
    icon: Zap,
    title: "快速查询",
    description: "输入学号或姓名即可秒查课表，无需等待，支持模糊搜索"
  },
  {
    icon: Shield,
    title: "数据准确",
    description: "与学校教务系统实时同步，确保课表信息的准确性和时效性"
  },
  {
    icon: Clock,
    title: "实时更新",
    description: "课程调整、教室变更等信息第一时间更新，不错过任何变化"
  },
  {
    icon: Users,
    title: "多维度查询",
    description: "支持学生课表、教师课表、教室课表三种查询模式"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            为什么选择绮课
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            专为中南大学师生打造的课程表查询工具，提供便捷、准确、实时的课表服务
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                更多贴心功能
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">支持周末显示切换</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">时间/序号显示模式切换</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">深色/浅色主题支持</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">课程详情一键查看</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  完全免费
                </div>
                <p className="text-slate-600">
                  为中南大学师生提供永久免费的课表查询服务
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}