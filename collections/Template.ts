/* This is a template for a new collection. */

import type { CollectionConfig } from 'payload'

export const _: CollectionConfig = {
  slug: '_',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}