import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, BookOpen } from "lucide-react";

export function ServicesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-[var(--chart-1)]/10 dark:to-[var(--chart-1)]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">特色服务入口</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Button asChild size="lg" className="max-w-md mx-auto bg-gradient-to-r from-[var(--chart-1)] to-[var(--chart-2)] hover:opacity-90 text-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <Link href="/discovery" className="flex flex-col items-center justify-center space-y-4 min-h-[180px]">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Compass className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">数据发现</h3>
                <p className="text-sm opacity-90">探索和发现课程数据的可视化分析</p>
              </div>
            </Link>
          </Button>
          <Button asChild size="lg" className="max-w-md mx-auto bg-gradient-to-r from-[var(--chart-3)] to-[var(--chart-4)] hover:opacity-90 text-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <Link href="/subjects" className="flex flex-col items-center justify-center space-y-4 min-h-[180px]">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <BookOpen className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">课程查询</h3>
                <p className="text-sm opacity-90">浏览和查询所有课程及其详细信息</p>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}