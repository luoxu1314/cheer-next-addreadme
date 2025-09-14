import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // 旧项目URL结构重定向映射
      // 1. 学院页面
      { source: '/departments/:department', destination: '/department/:department', permanent: true },
      
      // 2. 专业课表
      { source: '/schedule/profession/:profession', destination: '/table/profession/:profession', permanent: true },
      
      // 3. 教师课表
      { source: '/schedule/teacher/:teacherId', destination: '/table/teacher/:teacherId', permanent: true },
      
      // 4. 学生课表
      { source: '/schedule/student/:studentId', destination: '/table/student/:studentId', permanent: true },
      
      // 5. 地点课表
      { source: '/schedule/location/:locationId', destination: '/table/location/:locationId', permanent: true },
      
      // 6. 课程详情
      { source: '/courses/:courseId', destination: '/course/:courseId', permanent: true },
      
    ];
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig)
