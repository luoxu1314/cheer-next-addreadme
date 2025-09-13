import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
        ],
      },
    ],
    sitemap: 'https://qike.site/sitemap-index.xml',
  }
}

export const revalidate = 3600 // 每小时重新验证一次