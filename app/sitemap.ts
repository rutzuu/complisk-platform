import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'
import { getAllBlogPosts } from '@/actions/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  let dynamicRoutes: MetadataRoute.Sitemap = []
  
  try {
    const posts = await getAllBlogPosts()
    
    dynamicRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  return [...staticRoutes, ...dynamicRoutes]
}

