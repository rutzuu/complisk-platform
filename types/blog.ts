import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type Author = {
  name: string
  avatar?: {
    url?: string
  } | null
}

export type BlogPost = {
  id: string | number
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: {
    id: string
    url: string
    alt?: string
    width?: number
    height?: number
  } | null | number
  category: string
  author?: Author | null
  readTime?: number | null
  date: string | null
  createdAt: string
  updatedAt?: string
  publishedAt?: string
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  content: DefaultTypedEditorState | null
}

export type FeaturedBlog = BlogPost

export type BlogCategory = 'all' | 'tech' | 'updates' | 'tutorials' | 'news' | 'general'

export type BlogCategoryOption = {
  value: BlogCategory
  label: string
}

