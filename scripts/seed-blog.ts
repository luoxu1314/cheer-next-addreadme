import prisma from '@/lib/prisma';

async function seedBlogPosts() {
  const samplePosts = [
    {
      title: "Next.js 14 新特性详解",
      slug: "nextjs-14-features",
      content: `# Next.js 14 新特性详解

Next.js 14 带来了许多令人兴奋的新特性，让我们一起来看看这些改进。

## 主要特性

### 1. 服务器操作（Server Actions）
服务器操作现在更加稳定和易用：

\`\`\`typescript
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
  
  // 直接处理表单数据
  await db.post.create({
    data: { title, content }
  })
}
\`\`\`

### 2. 部分预渲染（Partial Prerendering）
结合静态生成和服务端渲染的优势。

### 3. 元数据改进
更好的 SEO 支持和元数据管理。

## 性能提升

- **更快的构建时间**：改进了编译流程
- **更小的包体积**：优化了代码分割
- **更好的缓存策略**：智能缓存机制

## 实际应用

这些特性在实际项目中如何应用？让我们看一个完整的例子：

\`\`\`typescript
// app/blog/[slug]/page.tsx
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
  }
}
\`\`\`

Next.js 14 确实为开发者提供了更强大的工具集，让全栈开发变得更加简单和高效。`,
      excerpt: "深入探讨 Next.js 14 的新特性和改进，包括服务器操作、部分预渲染和性能优化。",
      tags: ["Next.js", "React", "全栈开发"],
      published: true,
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    {
      title: "TypeScript 5.0 新功能指南",
      slug: "typescript-5-guide",
      content: `# TypeScript 5.0 新功能指南

TypeScript 5.0 带来了许多新功能和改进，让我们来看看这些变化。

## 装饰器元数据

TypeScript 5.0 引入了装饰器元数据支持：

\`\`\`typescript
class User {
  @validate
  @reflect
  name: string;
}
\`\`\`

## const 类型参数

新的 const 类型参数让类型推断更加精确：

\`\`\`typescript
function createArray<const T>(items: readonly T[]): T[] {
  return [...items];
}

const arr = createArray([1, 2, 3] as const); // number[]
\`\`\`

## 性能改进

- 更快的类型检查
- 更小的内存占用
- 更好的 IDE 体验

## 总结

TypeScript 5.0 让类型系统更加强大和易用。`,
      excerpt: "TypeScript 5.0 的新功能和改进，包括装饰器元数据、const 类型参数和性能优化。",
      tags: ["TypeScript", "JavaScript", "编程语言"],
      published: true,
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80"
    },
    {
      title: "Tailwind CSS 设计系统最佳实践",
      slug: "tailwind-css-best-practices",
      content: `# Tailwind CSS 设计系统最佳实践

Tailwind CSS 已经成为现代前端开发的首选工具，让我们探讨如何构建高效的设计系统。

## 组件设计

### 1. 可复用组件
\`\`\`jsx
// components/ui/button.tsx
export function Button({ variant, size, children }) {
  return (
    <button className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      variants[variant],
      sizes[size]
    )}>
      {children}
    </button>
  );
}
\`\`\`

### 2. 响应式设计
\`\`\`jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 响应式网格布局 -->
</div>
\`\`\`

## 主题定制

### 深色模式支持
\`\`\`javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  // ...
}
\`\`\`

## 性能优化

- **PurgeCSS 集成**：自动移除未使用的样式
- **JIT 模式**：按需生成样式
- **CSS 压缩**：生产环境优化

## 实际案例

看看这些最佳实践如何在真实项目中应用。`,
      excerpt: "学习如何构建高效的 Tailwind CSS 设计系统，包括组件设计、主题定制和性能优化。",
      tags: ["Tailwind CSS", "CSS", "设计系统"],
      published: true,
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=800&q=80"
    }
  ];

  console.log('开始添加博客文章...');

  for (const post of samplePosts) {
    try {
      const existing = await prisma.blogPost.findUnique({
        where: { slug: post.slug }
      });

      if (!existing) {
        await prisma.blogPost.create({
          data: {
            ...post,
            tags: JSON.stringify(post.tags),
            meta: JSON.stringify({}),
            publishedAt: new Date()
          }
        });
        console.log(`✅ 已添加文章: ${post.title}`);
      } else {
        console.log(`⏭️  文章已存在: ${post.title}`);
      }
    } catch (error) {
      console.error(`❌ 添加文章失败: ${post.title}`, error);
    }
  }

  console.log('博客文章数据初始化完成！');
}

if (require.main === module) {
  seedBlogPosts()
    .catch(console.error)
    .finally(() => process.exit(0));
}

export default seedBlogPosts;