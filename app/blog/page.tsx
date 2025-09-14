import { getBlogPosts } from "@/lib/server/blog-service";
import { BlogCard } from "@/components/blog/blog-card";
import { FeaturedPosts } from "@/components/blog/featured-posts";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BlogPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = Number(searchParams.page) || 1;
  const tag = searchParams.tag as string | undefined;
  const limit = 9;

  const [postsData] = await Promise.all([
    getBlogPosts({
      published: true,
      limit,
      offset: (page - 1) * limit,
      tag,
    }),
    // getFeaturedPosts(3)
  ]);

  const { posts, total } = postsData;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-blue bg-clip-text text-transparent mb-4">
            技术博客
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            分享技术见解、开发经验和学习心得
          </p>
        </div>

        {/* {featuredPosts.length > 0 && page === 1 && !tag && (
          <FeaturedPosts posts={featuredPosts} />
        )} */}

        {tag && (
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              标签:{" "}
              <span className="text-transparent gradient-purple bg-clip-text">
                {tag}
              </span>
            </h2>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无文章</p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <BlogPagination
              currentPage={page}
              totalPages={totalPages}
              baseUrl={tag ? `/blog?tag=${encodeURIComponent(tag)}` : "/blog"}
            />
          </>
        )}
      </div>
    </div>
  );
}
