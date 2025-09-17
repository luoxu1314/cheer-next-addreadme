'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlogPostList } from '@/components/admin/blog-post-list'
import { BlogPostEditor } from '@/components/admin/blog-post-editor'
import { ImageUpload } from '@/components/admin/image-upload'
import { StatsCards } from '@/components/admin/stats-cards'
import { AdManagement } from '@/components/admin/ad-management'
import { ConfigManagement } from '@/components/admin/config-management'
// 客户端不需要导入verifyToken，通过API验证

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('posts')
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
        return
      }

      try {
        const response = await fetch('/api/admin/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          localStorage.removeItem('adminToken')
          router.push('/admin/login')
        }
      } catch (error) {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              管理后台
            </h1>
            <Button variant="outline" onClick={handleLogout}>
              退出登录
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <StatsCards />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="posts">文章管理</TabsTrigger>
            <TabsTrigger value="editor">新建/编辑文章</TabsTrigger>
            <TabsTrigger value="upload">图片上传</TabsTrigger>
            <TabsTrigger value="ads">广告管理</TabsTrigger>
            <TabsTrigger value="config">系统配置</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>文章列表</CardTitle>
              </CardHeader>
              <CardContent>
                <BlogPostList 
                  onEditPost={() => setActiveTab('editor')} 
                  setEditingPostId={(id) => setEditingPostId(id)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="editor">
            <Card>
              <CardHeader>
                <CardTitle>文章编辑器</CardTitle>
              </CardHeader>
              <CardContent>
                <BlogPostEditor postId={editingPostId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>图片上传</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ads">
            <Card>
              <CardHeader>
                <CardTitle>广告管理</CardTitle>
              </CardHeader>
              <CardContent>
                <AdManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="config">
            <Card>
              <CardHeader>
                <CardTitle>系统配置</CardTitle>
              </CardHeader>
              <CardContent>
                <ConfigManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}