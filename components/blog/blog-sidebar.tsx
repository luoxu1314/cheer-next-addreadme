'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface Tag {
  name: string
  count: number
}

interface RecentPost {
  id: string
  title: string
  slug: string
  createdAt: string
}

export function BlogSidebar() {
  const [tags, setTags] = useState<Tag[]>([])
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchSidebarData()
  }, [])

  const fetchSidebarData = async () => {
    try {
      const [tagsResponse, recentResponse] = await Promise.all([
        fetch('/api/blog/tags'),
        fetch('/api/blog/posts?limit=5')
      ])

      if (tagsResponse.ok) {
        const tagsData = await tagsResponse.json()
        setTags(tagsData.tags)
      }

      if (recentResponse.ok) {
        const recentData = await recentResponse.json()
        setRecentPosts(recentData.posts)
      }
    } catch (error) {
      console.error('获取侧边栏数据失败:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="space-y-6 pt-16">
      {/* 搜索 */}
      <Card>
        <CardHeader>
          <CardTitle>搜索文章</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 热门标签 */}
      <Card>
        <CardHeader>
          <CardTitle>热门标签</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.name} href={`/blog?tag=${tag.name}`}>
                <Badge variant="secondary">
                  {tag.name} ({tag.count})
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 最近文章 */}
      <Card>
        <CardHeader>
          <CardTitle>最近文章</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div key={post.id}>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}