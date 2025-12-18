import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

/**
 * Example Services Collection
 * 
 * This is an example collection showing how to create a services section.
 * To enable this collection, uncomment it in payload.config.ts
 * 
 * Customization:
 * - Modify fields to match your service structure
 * - Add pricing fields if needed
 * - Include relationships to other collections
 * - Add custom fields like duration, availability, etc.
 */

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    description: 'Manage your services or products',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Service name',
      },
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly version of the name',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) {
              return value
            }

            if (data?.name) {
              return data.name
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
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description of the service',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      editor: lexicalEditor({}),
      admin: {
        description: 'Detailed service information',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Icon or image representing the service',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main service image',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Basic',
          value: 'basic',
        },
        {
          label: 'Premium',
          value: 'premium',
        },
        {
          label: 'Enterprise',
          value: 'enterprise',
        },
      ],
      defaultValue: 'basic',
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        description: 'Key features of this service',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Show this service on the website',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Display order (lower numbers appear first)',
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
}

