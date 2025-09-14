'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, FileText, Image as ImageIcon } from 'lucide-react'

export function StatsCards() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalViews: 0,
    totalImages: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      
      // 获取文章统计
      const postsResponse = await fetch('/api/blog/posts?published=false', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const postsData = await postsResponse.json()
      
      const publishedResponse = await fetch('/api/blog/posts?published=true', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const publishedData = await publishedResponse.json()

      // 计算总浏览量
      const totalViews = postsData.posts.reduce((sum: number, post: any) => sum + post.views, 0)

      setStats({
        totalPosts: postsData.total,
        publishedPosts: publishedData.total,
        totalViews,
        totalImages: 0 // 可以添加图片统计API
      })
    } catch (error) {
      console.error('获取统计数据失败:', error)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">总文章数</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPosts}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">已发布</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.publishedPosts}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">总浏览量</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">图片数量</CardTitle>
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalImages}</div>
        </CardContent>
      </Card>
    </div>
  )
}