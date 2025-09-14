# 博客系统文档

## 功能概述

这个博客系统是基于 Next.js 14、TypeScript、Prisma 和 Tailwind CSS 构建的现代化博客平台，具有以下核心功能：

### 用户功能
- 📝 博客文章浏览和阅读
- 🔍 全文搜索功能
- 🏷️ 标签分类浏览
- 📱 响应式设计，支持移动端
- 🔄 RSS 订阅
- 📊 文章浏览量统计
- 🔗 社交媒体分享

### 管理功能
- 🔐 管理员登录认证
- ✍️ 富文本编辑器（支持 MDX）
- 🖼️ 图片上传和管理
- 📊 数据统计面板
- 📝 文章创建、编辑、删除
- 🎯 文章发布/草稿状态管理
- ⭐ 精选文章设置

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **数据库**: PostgreSQL (Prisma ORM)
- **样式**: Tailwind CSS + Shadcn/ui
- **认证**: JWT + bcrypt
- **图片处理**: Sharp
- **富文本**: MDX
- **部署**: Vercel/自托管

## 项目结构

```
├── app/
│   ├── api/
│   │   ├── admin/           # 管理员认证API
│   │   ├── blog/            # 博客相关API
│   │   ├── files/           # 文件访问API
│   │   └── upload/          # 文件上传API
│   ├── admin/
│   │   ├── login/           # 管理员登录页面
│   │   └── dashboard/       # 管理后台
│   ├── blog/
│   │   ├── [slug]/          # 文章详情页
│   │   └── page.tsx         # 博客首页
│   ├── rss.xml/             # RSS订阅
│   └── sitemap-blog.xml/    # 博客站点地图
├── components/
│   ├── admin/               # 管理后台组件
│   ├── blog/                # 博客组件
│   └── ui/                  # UI组件库
├── lib/
│   ├── server/              # 服务端功能
│   │   ├── auth.ts          # 认证相关
│   │   ├── blog-service.ts  # 博客服务
│   │   └── image-service.ts # 图片服务
│   └── types/               # 类型定义
└── prisma/
    └── schema.prisma         # 数据库模型
```

## 安装和配置

### 环境要求
- Node.js 18+
- PostgreSQL 数据库
- pnpm 包管理器

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd premium-timetable
```

2. **安装依赖**
```bash
pnpm install
```

3. **环境变量配置**
创建 `.env` 文件：
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="your-jwt-secret-key"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

4. **数据库初始化**
```bash
pnpm prisma generate
pnpm prisma db push
```

5. **创建管理员账户**
```bash
# 运行此命令后按提示创建管理员
pnpm tsx scripts/create-admin.ts
```

6. **启动开发服务器**
```bash
pnpm dev
```

## API 文档

### 博客相关API

#### 获取文章列表
```http
GET /api/blog/posts?page=1&limit=10&tag=技术&search=关键词
```

#### 获取单篇文章
```http
GET /api/blog/posts/[id]
```

#### 通过slug获取文章
```http
GET /api/blog/posts/[slug]/by-slug
```

#### 获取标签列表
```http
GET /api/blog/tags
```

#### 搜索文章
```http
GET /api/blog/posts/search?q=关键词&page=1&limit=10
```

### 管理员API

#### 登录
```http
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

#### 验证Token
```http
GET /api/admin/verify
Authorization: Bearer [token]
```

### 文件上传API

#### 上传图片
```http
POST /api/upload/image
Content-Type: multipart/form-data
Authorization: Bearer [token]

file: [图片文件]
```

## 使用指南

### 管理员操作

1. **访问管理后台**
   - 访问 `/admin/login`
   - 使用管理员账户登录

2. **创建新文章**
   - 在管理后台点击"新建文章"
   - 填写标题、摘要、内容
   - 添加标签（用逗号分隔）
   - 上传封面图片
   - 保存为草稿或直接发布

3. **管理文章**
   - 查看文章列表
   - 编辑现有文章
   - 删除文章
   - 切换发布状态

4. **上传图片**
   - 支持拖拽上传
   - 自动压缩和格式转换
   - 生成可直接使用的URL

### 前端展示

1. **博客首页**
   - 显示精选文章
   - 分页浏览所有文章
   - 按标签筛选

2. **文章详情**
   - 完整内容展示
   - 标签显示
   - 浏览量统计
   - 社交分享按钮

3. **搜索功能**
   - 全文搜索
   - 实时结果展示

## 部署

### Vercel 部署

1. **准备环境变量**
   - 在 Vercel 控制台添加环境变量
   - 确保包含所有必要的环境变量

2. **部署命令**
```bash
vercel --prod
```

### 自托管部署

1. **构建项目**
```bash
pnpm build
```

2. **启动生产服务器**
```bash
pnpm start
```

3. **使用 PM2 管理**
```bash
pm install -g pm2
pm2 start pnpm --name "blog" -- start
```

## 性能优化

- 图片自动压缩和 WebP 格式转换
- 静态页面生成 (SSG)
- 数据库查询优化
- CDN 图片分发
- 响应式图片加载

## SEO 优化

- 自动生成站点地图
- RSS 订阅支持
- 结构化数据标记
- 友好的 URL 结构
- Meta 标签优化

## 安全特性

- JWT 认证机制
- 密码加密存储
- API 访问控制
- SQL 注入防护
- XSS 攻击防护

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查 DATABASE_URL 配置
   - 确保 PostgreSQL 服务运行

2. **图片上传失败**
   - 检查文件大小限制
   - 确保存储权限正确

3. **认证问题**
   - 检查 JWT_SECRET 配置
   - 验证管理员账户存在

### 技术支持

如有问题，请：
1. 检查控制台错误日志
2. 查看网络请求响应
3. 验证环境变量配置
4. 联系技术支持

## 更新日志

### v1.0.0 (当前版本)
- ✅ 基础博客功能
- ✅ 管理后台
- ✅ 图片上传
- ✅ 搜索功能
- ✅ 响应式设计
- ✅ SEO 优化

### 计划功能
- 🔄 评论系统
- 🔄 文章分类
- 🔄 作者页面
- 🔄 相关文章推荐
- 🔄 邮件订阅