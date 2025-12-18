import { Metadata } from 'next'

interface MetadataConfig {
  title?: string
  description?: string
  path?: string
  ogImage?: string
  article?: boolean
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

export const siteConfig = {
  name: 'Z0 Blog Template',
  description:
    'A modern, clean blog template built with Next.js, Payload CMS, and Tailwind CSS. From Zero to Hero - strip away complexity and focus on content.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  creator: '@zerosyslabs',
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  path = '',
  ogImage,
  article = false,
  publishedTime,
  modifiedTime,
  tags = [],
}: MetadataConfig = {}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogUrl = ogImage || `${siteConfig.url}/og-image.png`

  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description,
    authors: [
      { name: siteConfig.name, url: siteConfig.url },
      { name: 'Zerosyslabs', url: 'https://www.zerosyslabs.com' },
    ],
    creator: siteConfig.creator,
    openGraph: {
      type: article ? 'article' : 'website',
      locale: 'en_US',
      url,
      title: title || siteConfig.name,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      ...(article && {
        publishedTime,
        modifiedTime,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description,
      creator: siteConfig.creator,
      images: [ogUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateJsonLd({
  type = 'Organization',
  name = siteConfig.name,
  description = siteConfig.description,
  url = siteConfig.url,
  logo = `${siteConfig.url}/logo.png`,
  sameAs = [],
  additionalProperties = {},
}: {
  type?: 'Organization' | 'WebSite' | 'Article' | 'LocalBusiness'
  name?: string
  description?: string
  url?: string
  logo?: string
  sameAs?: string[]
  additionalProperties?: Record<string, unknown>
} = {}) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    ...additionalProperties,
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        logo,
        sameAs,
      }

    case 'WebSite':
      return {
        ...baseSchema,
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${url}/blog?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }

    case 'Article':
      return {
        ...baseSchema,
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo,
        },
      }

    default:
      return baseSchema
  }
}

