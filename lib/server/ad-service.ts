import prisma from '@/lib/prisma'
import type { BlogPost } from '@/lib/types/blog'

export interface AdPost extends BlogPost {
  isAd: true
  adClient: string
  adContact: string
  adStartDate: Date
  adEndDate: Date
  adStatus: 'pending' | 'active' | 'expired' | 'rejected'
  adPrice: number
  adDuration: number
}

export interface AdCreate {
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string
  adClient: string
  adContact: string
  adStartDate: Date
  adDuration: number
  adPrice: number
}

export interface AdUpdate {
  title?: string
  content?: string
  excerpt?: string
  coverImage?: string
  adClient?: string
  adContact?: string
  adStartDate?: Date
  adEndDate?: Date
  adStatus?: 'pending' | 'active' | 'expired' | 'rejected'
  adPrice?: number
  adDuration?: number
}

export async function getActiveAds(options: {
  limit?: number
  offset?: number
} = {}): Promise<{ ads: AdPost[]; total: number }> {
  const { limit = 10, offset = 0 } = options

  const now = new Date()
  
  const [ads, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: {
        isAd: true,
        adStatus: 'active',
        adStartDate: { lte: now },
        adEndDate: { gte: now },
        published: true
      },
      orderBy: { adStartDate: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.blogPost.count({
      where: {
        isAd: true,
        adStatus: 'active',
        adStartDate: { lte: now },
        adEndDate: { gte: now },
        published: true
      }
    })
  ])

  return {
    ads: ads as AdPost[],
    total
  }
}

export async function getAllAds(options: {
  limit?: number
  offset?: number
  status?: string
} = {}): Promise<{ ads: AdPost[]; total: number }> {
  const { limit = 10, offset = 0, status } = options

  const where: any = { isAd: true }
  if (status && status !== 'all') {
    where.adStatus = status
  }

  const [ads, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.blogPost.count({ where })
  ])

  return {
    ads: ads as AdPost[],
    total
  }
}

export async function createAd(data: AdCreate): Promise<AdPost> {
  const adEndDate = new Date(data.adStartDate)
  adEndDate.setMonth(adEndDate.getMonth() + data.adDuration)

  return prisma.blogPost.create({
    data: {
      ...data,
      isAd: true,
      adEndDate,
      adStatus: 'pending',
      published: false,
      publishedAt: null,
    }
  }) as Promise<AdPost>
}

export async function updateAd(id: string, data: AdUpdate): Promise<AdPost> {
  const updateData: any = { ...data }

  if (data.adStartDate && data.adDuration) {
    const adEndDate = new Date(data.adStartDate)
    adEndDate.setMonth(adEndDate.getMonth() + data.adDuration)
    updateData.adEndDate = adEndDate
  }

  if (data.adStatus === 'active' && !data.published) {
    updateData.published = true
    updateData.publishedAt = new Date()
  }

  return prisma.blogPost.update({
    where: { id },
    data: updateData
  }) as Promise<AdPost>
}

export async function deleteAd(id: string): Promise<AdPost> {
  return prisma.blogPost.delete({
    where: { id }
  }) as Promise<AdPost>
}

export async function checkExpiredAds(): Promise<number> {
  const now = new Date()
  
  const result = await prisma.blogPost.updateMany({
    where: {
      isAd: true,
      adStatus: 'active',
      adEndDate: { lt: now }
    },
    data: {
      adStatus: 'expired',
      published: false
    }
  })

  return result.count
}

export async function getAdById(id: string): Promise<AdPost | null> {
  const ad = await prisma.blogPost.findUnique({
    where: { id }
  })

  return ad ? (ad as AdPost) : null
}