import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

/**
 * Example Pages Collection
 * 
 * This is an example collection showing how to create static pages.
 * To enable this collection, uncomment it in payload.config.ts
 * 
 * Customization:
 * - Add/remove fields based on your needs
 * - Modify the slug generation logic
 * - Add custom validation or hooks
 * - Implement access control if needed
 */

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    description: 'Manage static pages for your site',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Page title (used in navigation and SEO)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly version of the title',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) {
              return value
            }

            if (data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim()
            }

            return value
          },
        ],
      },
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image to display with the page',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'SEO title (leave empty to use page title)',
      },
      maxLength: 60,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'SEO description (150-160 characters recommended)',
      },
      maxLength: 160,
    },
    {
      name: 'keywords',
      type: 'text',
      admin: {
        description: 'Comma-separated keywords for SEO',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Control page visibility',
      },
    },
  ],
  timestamps: true,
}

