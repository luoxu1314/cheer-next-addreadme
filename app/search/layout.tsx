import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "课表查询 - 绮课",
  description: "中南大学课程表在线查询平台，支持学生课表、教师课表、教室课表快速查找，提供完整的课程、开课数据和优异的用户体验",
  keywords: [
    "中南大学",
    "课表查询",
    "课程表",
    "学生课表",
    "教师课表",
    "教室课表",
    "中南大学课程",
    "绮课",
    "中南大学课表"
  ],
  authors: [{ name: "花野猫" }],
  creator: "绮课",
  publisher: "绮课",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://qike.site"),
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: "课表查询 - 绮课",
    description: "中南大学课程表在线查询平台，支持学生课表、教师课表、教室课表快速查找",
    url: "/search",
    siteName: "绮课",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/icons/pwa-192x192.png",
        width: 192,
        height: 192,
        alt: "绮课图标",
      },
      {
        url: "/icons/pwa-512x512.png",
        width: 512,
        height: 512,
        alt: "绮课图标",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "课表查询",
    description: "中南大学课程表在线查询平台，支持学生课表、教师课表、教室课表快速查找",
    images: ["/screenshots/qike.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

interface SearchLayoutProps {
  children: ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}