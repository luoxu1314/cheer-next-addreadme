import Link from "next/link";
import { Calendar, Mail, Github, Heart } from "lucide-react";
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-secondary/30 to-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">绮课</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              绮课是专为中南大学师生打造的课程表查询平台，致力于提供便捷、准确、实时的课表查询服务。
            </p>
            <div className="mt-4 flex items-center space-x-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-destructive" />
              <span>用心服务每一位中南人</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              快速链接
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link 
                  href="/search/student" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  学生课表
                </Link>
              </li>
              <li>
                <Link 
                  href="/search/teacher" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  教师课表
                </Link>
              </li>
              <li>
                <Link 
                  href="/search/classroom" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  教室课表
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              联系我们
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">huayemao4o@outlook.com</span>
              </li>
              <li>
                <a
                  href="https://github.com/huayemao/cheer-next"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} 绮课. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              中南大学课程表查询平台
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}