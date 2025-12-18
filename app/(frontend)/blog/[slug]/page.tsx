import { Metadata } from "next"
import Image from "next/image"
import { RichText as SerializedRichText } from "@payloadcms/richtext-lexical/react"
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getAllBlogPosts } from "@/actions/blog"
import { generateMetadata as generateSEOMetadata } from "@/lib/metadata"

function formatDate(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ 
  params 
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {}
  }

  const ogImage = typeof post.featuredImage === 'object' && post.featuredImage?.url
    ? post.featuredImage.url
    : undefined

  return generateSEOMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    path: `/blog/${post.slug}`,
    ogImage,
    article: true,
    publishedTime: post.createdAt,
    modifiedTime: post.updatedAt,
    tags: post.keywords?.split(',').map(k => k.trim()) || [],
  })
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

const Page = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params
  const data = await getBlogPostBySlug(slug)

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <header className="mb-12 text-center">
            <Badge variant="outline" className="mb-6">
              {data.category}
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 leading-tight">
              {data.title}
            </h1>
            
            {data.excerpt && (
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {data.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-center gap-4 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>{formatDate(data.createdAt)}</time>
              </div>
              {data.readTime && (
                <>
                  <span>•</span>
                  <span>{data.readTime} min read</span>
                </>
              )}
            </div>

            {data.author && (
              <div className="flex items-center justify-center gap-3">
                {data.author.avatar && typeof data.author.avatar === 'object' && data.author.avatar.url && (
                  <Image
                    src={data.author.avatar.url}
                    alt={data.author.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <span className="text-sm font-medium">{data.author.name}</span>
              </div>
            )}
          </header>

          <article className="max-w-none">
            <SerializedRichText
              className="payload-richtext"
              data={data.content as DefaultTypedEditorState}
            />
          </article>

          <footer className="mt-16 pt-8 border-t">
            <div className="text-center">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to All Posts
                </Link>
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Page