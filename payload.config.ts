import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Users } from '@/collections/Users'
import { Posts } from '@/collections/Posts'
import { Media } from '@/collections/Media'
// import { Pages } from '@/collections/Pages'
// import { Services } from '@/collections/Services'

export default buildConfig({
  editor: lexicalEditor(),
  admin: {
    user: 'users',
  },

  /**
   * Collections Configuration
   * 
   * Core Collections (Required):
   * - Users: Authentication and user management
   * - Posts: Blog posts with categories, authors, and SEO
   * - Media: File uploads with Vercel Blob storage support
   * 
   * Example Collections (Optional - Uncomment to enable):
   * - Pages: For creating static pages (About, Contact, etc.)
   * - Services: For showcasing services or products
   * 
   * To add a new collection:
   * 1. Create a new file in /collections
   * 2. Import it at the top of this file
   * 3. Add it to the collections array below
   * 4. Run the dev server to see it in the admin panel
   */
  collections: [
    Users,
    Posts,
    Media,
    // Pages,      // Uncomment to enable Pages collection
    // Services,   // Uncomment to enable Services collection
  ],

  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN ? [
      vercelBlobStorage({
        collections: {
          media: true,
        },
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
    ] : []),
  ],

  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})
