import Link from "next/link";
import { Calendar, Mail, Github, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                绮课
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600 max-w-md">
              绮课 - 中南大学专属课程表查询平台，为学生和教师提供便捷的课程信息查询服务。
            </p>
            <div className="mt-4 flex items-center space-x-2 text-sm text-slate-500">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Made with love for CSU students</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">
              快速链接
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link 
                  href="/search/student" 
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  学生课表
                </Link>
              </li>
              <li>
                <Link 
                  href="/search/teacher" 
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  教师课表
                </Link>
              </li>
              <li>
                <Link 
                  href="/search/classroom" 
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  教室课表
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">
              联系我们
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">feedback@qike.app</span>
              </li>
              <li>
                <a
                  href="https://github.com/qike-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">
              © {currentYear} 绮课. All rights reserved.
            </p>
            <p className="text-sm text-slate-500 mt-2 md:mt-0">
              中南大学课程表查询平台
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}