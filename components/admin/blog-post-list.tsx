'use client'

import { useEffect, useState } from 'react'
import { BlogPost } from '@/lib/types/blog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Eye, Edit, Trash2, Calendar } from 'lucide-react'

export function BlogPostList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/blog/posts?published=false', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setPosts(data.posts)
    } catch (error) {
      console.error('获取文章列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePublish = async (id: string, published: boolean) => {
    try {
      const token = localStorage.getItem('adminToken')
      await fetch(`/api/blog/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ published })
      })
      fetchPosts()
    } catch (error) {
      console.error('更新发布状态失败:', error)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      const token = localStorage.getItem('adminToken')
      await fetch(`/api/blog/posts/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setDeleteId(null)
      fetchPosts()
    } catch (error) {
      console.error('删除文章失败:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">标题</th>
              <th className="text-left py-2">状态</th>
              <th className="text-left py-2">浏览量</th>
              <th className="text-left py-2">创建时间</th>
              <th className="text-left py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b">
                <td className="py-3">
                  <div>
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-gray-500">/{post.slug}</div>
                  </div>
                </td>
                <td className="py-3">
                  <Badge variant={post.published ? 'default' : 'secondary'}>
                    {post.published ? '已发布' : '草稿'}
                  </Badge>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(post.createdAt, 'MM/dd', { locale: zhCN })}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={post.published}
                      onCheckedChange={(checked) => togglePublish(post.id, checked)}
                    />
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              此操作将永久删除该文章，无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}