import { BlogSidebar } from '@/components/blog/blog-sidebar'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <main className="lg:col-span-3">
          {children}
        </main>
        <aside className="lg:col-span-1">
          <BlogSidebar />
        </aside>
      </div>
    </div>
  )
}