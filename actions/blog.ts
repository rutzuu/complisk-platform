'use server'

import { payload } from "@/lib/payload"
import type { BlogPost, FeaturedBlog } from "@/types/blog"

export async function getFeaturedBlog(): Promise<FeaturedBlog | null> {
  try {
    const result = await payload.find({
      collection: "posts",
      limit: 1,
      sort: "-createdAt",
      depth: 2,
      where: {
        and: [
          {
            includedInBlog: {
              equals: true,
            },
          },
          {
            isFeatured: {
              equals: true,
            },
          },
        ],
      },
    })

    return (result.docs[0] as unknown as FeaturedBlog) || null
  } catch (error) {
    console.error("Error fetching featured blog:", error)
    return null
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const result = await payload.find({
      collection: "posts",
      sort: "-createdAt",
      depth: 2,
      where: {
        and: [
          {
            includedInBlog: {
              equals: true,
            },
          },
          {
            isFeatured: {
              not_equals: true,
            },
          },
        ],
      },
    })

    return result.docs as unknown as BlogPost[]
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getAllBlogPosts(limit?: number): Promise<BlogPost[]> {
  try {
    const result = await payload.find({
      collection: "posts",
      sort: "-createdAt",
      depth: 2,
      limit: limit || undefined,
      where: {
        includedInBlog: {
          equals: true,
        },
      },
    })

    return result.docs as unknown as BlogPost[]
  } catch (error) {
    console.error("Error fetching all blog posts:", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const result = await payload.find({
      collection: "posts",
      depth: 2,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            includedInBlog: {
              equals: true,
            },
          },
        ],
      },
    })

    return (result.docs[0] as unknown as BlogPost) || null
  } catch (error) {
    console.error("Error fetching blog post by slug:", error)
    return null
  }
}

export async function getPaginatedBlogPosts({
  page = 1,
  limit = 10,
  excludedId,
  category,
}: {
  page?: number
  limit?: number
  excludedId?: string
  category?: string
}) {
  try {
    const where: any = {
      includedInBlog: {
        equals: true,
      },
    }

    if (excludedId) {
      where.id = {
        not_equals: excludedId,
      }
    }

    if (category && category !== 'all') {
      where.category = {
        equals: category,
      }
    }

    const result = await payload.find({
      collection: 'posts',
      sort: '-createdAt',
      depth: 2,
      page,
      limit,
      where,
    })

    return {
      posts: result.docs as unknown as BlogPost[],
      hasNextPage: result.hasNextPage,
    }
  } catch (error) {
    console.error('Error fetching paginated blog posts:', error)
    return {
      posts: [],
      hasNextPage: false,
    }
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    if (category === 'all') {
      return getAllBlogPosts()
    }

    const result = await payload.find({
      collection: "posts",
      sort: "-createdAt",
      depth: 2,
      where: {
        and: [
          {
            includedInBlog: {
              equals: true,
            },
          },
          {
            category: {
              equals: category,
            },
          },
        ],
      },
    })

    return result.docs as unknown as BlogPost[]
  } catch (error) {
    console.error("Error fetching blog posts by category:", error)
    return []
  }
}

