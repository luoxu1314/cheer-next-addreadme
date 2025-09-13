import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cheer Next - Premium Timetable',
    short_name: 'Cheer Timetable',
    description: 'Premium timetable application for course management and scheduling',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'zh-CN',
    dir: 'ltr',
    categories: ['education', 'productivity'],
    icons: [
      {
        src: '/icons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/pwa-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icons/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    screenshots: [
      {
        src: '/screenshots/qike.png',
        sizes: '1280x720',
        type: 'image/png',
      },
      {
        src: '/screenshots/qike.png',
        sizes: '390x844',
        type: 'image/png',
      }
    ],
    prefer_related_applications: false,
    shortcuts: [
      {
        name: '课表',
        short_name: 'Search',
        description: '搜索课表',
        url: '/search',
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
    ]
  }
}