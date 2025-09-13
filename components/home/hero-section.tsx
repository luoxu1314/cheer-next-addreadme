import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Users, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 min-h-screen">
      {/* Semantic Background Gradient - 使用天青色主题色 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--chart-1)]/25 via-[var(--chart-2)]/20 to-[var(--chart-3)]/25 dark:from-[var(--chart-1)]/35 dark:via-[var(--chart-2)]/30 dark:to-[var(--chart-3)]/35"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[var(--chart-4)]/40 via-transparent to-transparent dark:from-[var(--chart-4)]/50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[var(--chart-5)]/40 via-transparent to-transparent dark:from-[var(--chart-5)]/50"></div>
      <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,var(--tw-gradient-stops))] from-transparent via-[var(--primary)]/15 to-transparent dark:via-[var(--primary)]/25"></div>
      
      {/* Semantic Animated Orbs - 使用主色调 */}
      <div className="absolute top-20 md:top-1/5 left-1/6 md:left-1/5 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-[var(--primary)] via-[var(--chart-1)] to-[var(--chart-2)] rounded-full blur-3xl opacity-40 animate-float dark:opacity-50"></div>
      <div className="absolute top-12 md:top-1/7 right-1/5 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-[var(--chart-2)] via-[var(--chart-3)] to-[var(--accent)] rounded-full blur-3xl opacity-40 animate-float animation-delay-1000 dark:opacity-50"></div>
      <div className="absolute bottom-32  md:bottom-1/5 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-[var(--chart-4)] via-[var(--chart-5)] to-[var(--primary)] rounded-full blur-3xl opacity-40 animate-float animation-delay-2000 dark:opacity-50"></div>

      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-br from-primary to-accent rounded-full shadow-2xl">
                <Calendar className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-gradient-pink-end bg-clip-text text-transparent mb-6">
            绮课
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground mb-4 font-medium">
            中南大学专属课程表查询平台
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            为学生、教师提供便捷的课程信息查询服务，支持学生课表、教师课表、教室课表快速查找，提供完整的课程、开课数据和优异的用户体验
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-8 py-3 rounded-full shadow-lg">
              <Link href="#search">
                <Search className="mr-2 h-5 w-5" />
                立即查询
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-accent text-accent hover:bg-accent/10 px-8 py-3 rounded-full">
              <Link href="#features">
                了解更多
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg">
            <div className="text-3xl font-bold text-primary mb-2">10万+</div>
            <div className="text-sm text-muted-foreground">学生用户</div>
          </div>
          <div className="text-center p-6 bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg">
            <div className="text-3xl font-bold text-accent mb-2">5000+</div>
            <div className="text-sm text-muted-foreground">教师信息</div>
          </div>
          <div className="text-center p-6 bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg">
            <div className="text-3xl font-bold text-gradient-pink-end mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">教室资源</div>
          </div>
        </div>
      </div>
    </section>
  );
}