'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card } from '@/components/ui/card'

interface BlogPostEditorProps {
  postId: string | null
}

export function BlogPostEditor({ postId }: BlogPostEditorProps) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingPostId, setEditingPostId] = useState<string | null>(null)

  // 当组件挂载或标签页切换过来时，检查是否有要编辑的文章
  useEffect(() => {
    const editId = postId || localStorage.getItem('editBlogPostId');
    if (editId) {
      loadPostData(editId);
    }
  }, [postId]);

  const loadPostData = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/blog/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      setTitle(data.title || '');
      setSlug(data.slug || '');
      setContent(data.content || '');
      setExcerpt(data.excerpt || '');
      setTags(Array.isArray(data.tags) ? data.tags.join(', ') : '');
      setPublished(data.published || false);
      setFeatured(data.featured || false);
      setEditingPostId(id);
    } catch (error) {
      console.error('加载文章数据失败:', error);
      alert('加载文章数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('adminToken')
      const isEditing = !!editingPostId;
      const url = isEditing ? `/api/blog/posts/${editingPostId}` : '/api/blog/posts';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          slug,
          content,
          excerpt,
          tags: tags.split(',').map(t => t.trim()).filter(t => t),
          published,
          featured
        })
      })

      if (response.ok) {
        alert(isEditing ? '文章更新成功！' : '文章创建成功！')
        
        // 如果是编辑模式，清除localStorage中的编辑ID
        if (isEditing) {
          localStorage.removeItem('editBlogPostId');
          setEditingPostId(null);
        } else {
          // 如果是创建模式，重置表单
          setTitle('')
          setSlug('')
          setContent('')
          setExcerpt('')
          setTags('')
          setPublished(false)
          setFeatured(false)
        }
      } else {
        const error = await response.json()
        alert(`${isEditing ? '更新' : '创建'}失败: ${error.error}`)
      }
    } catch (error) {
      console.error(`${editingPostId ? '更新' : '创建'}文章失败:`, error)
      alert(`${editingPostId ? '更新' : '创建'}文章失败`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">标题</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="例如: my-blog-post"
            required
          />
        </div>

        <div>
          <Label htmlFor="excerpt">摘要</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="tags">标签</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="标签1, 标签2, 标签3"
          />
        </div>

        <div>
          <Label htmlFor="content">内容 (Markdown)</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published">立即发布</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={setFeatured}
            />
            <Label htmlFor="featured">设为精选</Label>
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? (editingPostId ? '更新中...' : '创建中...') : (editingPostId ? '更新文章' : '创建文章')}
        </Button>
      </div>
    </form>
  )
}