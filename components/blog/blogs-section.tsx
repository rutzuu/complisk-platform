import Link from "next/link";
import { payload } from "@/lib/payload";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";

function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const BlogsSection = async () => {
  const blogs = await payload.find({
    collection: "posts",
    limit: 6,
    sort: "-createdAt",
    where: {
      includedInBlog: {
        equals: true,
      },
    },
  });

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Latest Posts
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            From the Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on modern web development and design.
          </p>
        </div>

        {blogs.docs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogs.docs.map((blog) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog.id}
                className="group block"
              >
                <article className="bg-background border rounded-lg p-6 h-full transition-all duration-200 hover:shadow-lg hover:border-primary/20">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <time>{formatDate(blog.createdAt)}</time>
                    </div>
                    
                    <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Read more
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts found.</p>
            <p className="text-sm text-muted-foreground">
              Check back soon for new content!
            </p>
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/blog">
              View All Posts
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;