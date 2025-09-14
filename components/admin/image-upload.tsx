'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Upload, Image as ImageIcon, Copy } from 'lucide-react'
import Image from 'next/image'

export function ImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadedImages, setUploadedImages] = useState<Array<{
    id: string
    url: string
    filename: string
    width: number
    height: number
    size: number
  }>>([])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', files[0])

      const token = localStorage.getItem('adminToken')
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100
          setProgress(percentComplete)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText)
          setUploadedImages(prev => [result, ...prev])
        } else {
          alert('上传失败')
        }
        setUploading(false)
        setProgress(0)
      })

      xhr.addEventListener('error', () => {
        alert('上传失败')
        setUploading(false)
        setProgress(0)
      })

      xhr.open('POST', '/api/upload/image')
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      xhr.send(formData)
    } catch (error) {
      console.error('上传失败:', error)
      setUploading(false)
      setProgress(0)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  }

  return (
    <div className="space-y-6">
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button type="button" disabled={uploading} asChild>
            <div className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? '上传中...' : '选择图片'}
            </div>
          </Button>
        </label>
      </div>

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {Math.round(progress)}%
          </p>
        </div>
      )}

      {uploadedImages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">已上传图片</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {uploadedImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={image.url}
                    alt={image.filename}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {image.width} × {image.height} • {(image.size / 1024).toFixed(1)} KB
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={image.url}
                      readOnly
                      className="flex-1 text-sm px-2 py-1 border rounded"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(image.url)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}