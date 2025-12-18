import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'This will be auto-generated from the title if left empty',
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
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Brief description of the post',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image to display with the post',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Tech',
          value: 'tech',
        },
        {
          label: 'Updates',
          value: 'updates',
        },
        {
          label: 'Tutorials',
          value: 'tutorials',
        },
        {
          label: 'News',
          value: 'news',
        },
        {
          label: 'General',
          value: 'general',
        },
      ],
      required: true,
      defaultValue: 'general',
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'readTime',
      type: 'number',
      admin: {
        description: 'Estimated read time in minutes',
      },
      defaultValue: 5,
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this post in the featured section',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: new Date(),
    },
    {
      name: 'includedInBlog',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'SEO title (leave empty to use post title)',
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
  ],
  timestamps: true,
}
