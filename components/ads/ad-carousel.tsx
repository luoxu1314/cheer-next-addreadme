'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { adsConfig } from '@/lib/config/ads.config'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"

// 广告数据接口
interface Ad {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string | null
  adClient: string
  adPrice: number
  adDuration: number
  adStartDate: Date
  adEndDate: Date
}

interface AdCarouselProps {
  serverAds: Ad[]
}

// 功能说明卡片数据
const featureCard = {
  id: 'feature-card',
  title: '🚀 绮课校园推广计划 —— 让好创意遇上对的人',
  content: '正在筹备一场酷炫的社团活动？🎉有一个超棒的大创想法？💡又或是，你想分享自己的开源项目、创意作品？🚀绮课✨为你预留了最显眼的校园推广位——你敢把想法变成行动，在绮课，就能让行动遇见对的人。 ❤️‍🔥',
  slug: '/ads/pricing',
  adClient: '绮课官方',
  adPrice: 0,
  adDuration: 0
} as Ad

export function AdCarousel({ serverAds }: AdCarouselProps) {
  // 将功能说明卡片添加到广告列表中
  const adsWithFeature = [...serverAds, featureCard]
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // 格式化价格
  const formatPrice = (price: number) => {
    return (price / 100).toFixed(0)
  }

  // 格式化日期
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }


  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <Carousel
        // setApi={setCarouselApi}
        opts={{
          loop: true,
          dragFree: true,
        }}
        plugins={[
          Autoplay({
            delay: 8000,
          }),
        ]}
        className="relative aspect-[20/9] h-64 mx-auto overflow-hidden rounded-xl shadow-xl group"
      >
        <CarouselContent>
          {adsWithFeature.map((ad) => (
            <CarouselItem key={ad.id} className="relative h-64 w-full">
              {/* 广告卡片容器 */}
              <div className="relative w-full h-full">
                {/* 背景图片 */}
                {ad.coverImage ? (
                  <Image
                    src={ad.coverImage}
                    alt={ad.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-chart-3/30 to-chart-2/30" />
                )}

                {/* 蒙层效果 */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/10" />

                {/* 功能说明卡片特殊样式 */}
                {ad.id === 'feature-card' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-blue-600/80" />
                )}

                {/* 卡片内容 - 浮于图片之上 */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  {/* 广告标识 */}
                  {ad.id !== 'feature-card' && (
                    <Badge className="absolute top-6 right-6 bg-chart-3 text-primary-foreground shadow-md">
                      推广
                    </Badge>
                  )}

                  {/* 广告标题 */}
                  <h3 className={`text-xl md:text-2xl font-bold mb-3 ${ad.id === 'feature-card' ? 'text-white' : 'text-foreground'} drop-shadow-md`}>
                    {ad.title}
                  </h3>

                  {/* 广告描述 */}
                  <p className={`text-sm md:text-base mb-6 line-clamp-3 ${ad.id === 'feature-card' ? 'text-white/90' : 'text-muted-foreground'} drop-shadow-sm`}>
                    {ad.content}
                  </p>

                  {/* 广告信息和按钮 */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {ad.id !== 'feature-card' && (
                      <div className="flex flex-col gap-1">
                        <Badge variant="secondary" className="bg-background/80 text-foreground backdrop-blur-sm">
                          {ad.adClient}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          有效期: {formatDate(ad.adStartDate)} - {formatDate(ad.adEndDate)}
                        </span>
                      </div>
                    )}

                    <Button
                      asChild
                      className={`shadow-lg transform transition hover:scale-105 hover:shadow-xl ${ad.id === 'feature-card' ? 'bg-white text-purple-600 hover:bg-white/90' : 'gradient-purple text-primary-foreground'}`}
                    >
                      <Link href={ad.id === 'feature-card' ? ad.slug : `/ads/${ad.slug}`}>
                        {ad.id === 'feature-card' ? '立即申请发布' : '查看详情'}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 导航按钮 */}
        {adsWithFeature.length > 1 && (
          <>
            <CarouselPrevious
              className="left-4 top-1/2 -translate-y-1/2 bg-background/40 backdrop-blur-md hover:bg-background/60 text-foreground border-none rounded-full shadow-lg z-20"
              aria-label="上一张"
            >
              <ChevronLeft className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext
              className="right-4 top-1/2 -translate-y-1/2 bg-background/40 backdrop-blur-md hover:bg-background/60 text-foreground border-none rounded-full shadow-lg z-20"
              aria-label="下一张"
            >
              <ChevronRight className="h-6 w-6" />
            </CarouselNext>
          </>
        )}

        {/* 指示器 */}
        {adsWithFeature.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
            {adsWithFeature.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-chart-3 scale-125'
                  : 'bg-background/60 hover:bg-background/80'}
                  `}
                onClick={() => {
                  carouselApi?.scrollTo(index)
                }}
                aria-label={`切换到第 ${index + 1} 张`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  )
}