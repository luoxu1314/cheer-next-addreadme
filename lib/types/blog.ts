export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string
  published: boolean
  featured: boolean
  views: number
  tags: string[]
  meta: Record<string, any>
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

export interface FileRecord {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  alt?: string
  width?: number
  height?: number
  createdAt: Date
}

export interface Admin {
  id: string
  username: string
  createdAt: Date
}

export interface BlogPostCreate {
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string
  tags: string[]
  published?: boolean
  featured?: boolean
  meta?: Record<string, any>
}

export interface BlogPostUpdate {
  title?: string
  slug?: string
  content?: string
  excerpt?: string
  coverImage?: string
  tags?: string[]
  published?: boolean
  featured?: boolean
  meta?: Record<string, any>
}

export interface AdminLogin {
  username: string
  password: string
}

export interface ImageUploadResponse {
  id: string
  url: string
  filename: string
  width: number
  height: number
  size: number
}