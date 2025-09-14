import { BlogPost } from '@/lib/types/blog'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Eye } from 'lucide-react'

interface FeaturedPostsProps {
  posts: BlogPost[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null

  const [featured, ...others] = posts

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        精选文章
      </h2>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 主要精选文章 */}
        <div className="lg:col-span-2">
          <article className="group bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            {featured.coverImage && (
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span className="px-2 py-1 bg-primary/10 text-primary-foreground rounded text-xs font-medium">
                  精选
                </span>
                <time dateTime={featured.createdAt.toISOString()}>
                  {format(featured.createdAt, 'MM月dd日', { locale: zhCN })}
                </time>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{featured.views}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                <Link href={`/blog/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h3>

              {featured.excerpt && (
                <p className="text-muted-foreground line-clamp-2">
                  {featured.excerpt}
                </p>
              )}
            </div>
          </article>
        </div>

        {/* 其他精选文章 */}
        <div className="space-y-4">
          {others.map((post) => (
            <article key={post.id} className="group bg-card rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <time dateTime={post.createdAt.toISOString()}>
                  {format(post.createdAt, 'MM/dd', { locale: zhCN })}
                </time>
                <span>•</span>
                <span>{post.views} 阅读</span>
              </div>
              
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h4>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}