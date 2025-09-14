'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, Twitter, Facebook, Link, Check } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface ShareButtonsProps {
  title: string
  url: string
  summary?: string
}

export function ShareButtons({ title, url, summary }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(title)
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          分享
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="grid gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={shareOnTwitter}
          >
            <Twitter className="h-4 w-4 mr-2" />
            分享到 Twitter
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={shareOnFacebook}
          >
            <Facebook className="h-4 w-4 mr-2" />
            分享到 Facebook
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 mr-2 text-green-500" />
            ) : (
              <Link className="h-4 w-4 mr-2" />
            )}
            {copied ? '已复制' : '复制链接'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}