# Zerosyslabs Blog Template

A modern, production-ready blog template built with Next.js, Payload CMS, and Tailwind CSS. From Zero to Hero - strip away complexity and focus on content.

![Zerosyslabs](https://img.shields.io/badge/Zerosyslabs-From%20Zero%20to%20Hero-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.4-black)
![Payload CMS](https://img.shields.io/badge/Payload%20CMS-3.50-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-cyan)

## Features

### Core Features
- **Zero Complexity**: Clean, minimal design that focuses on your content
- **Hero Performance**: Optimized for speed with Next.js 15 and React Server Components
- **Developer First**: Built with TypeScript, modern best practices, and comprehensive documentation
- **Production Ready**: Complete with SEO, metadata, sitemaps, and structured data
- **Responsive Design**: Mobile-first approach with beautiful UI components

### Content Management
- **Rich Content Editor**: Payload CMS with Lexical rich text editor
- **Media Management**: Support for both local storage and Vercel Blob storage
- **Draft System**: Built-in draft/publish workflow
- **Category System**: Flexible categorization for blog posts
- **Featured Posts**: Highlight important content
- **Author Profiles**: Author information with avatars

### SEO & Performance
- **Dynamic SEO**: Automatic metadata generation for all pages
- **OpenGraph Support**: Proper social media sharing with images
- **Structured Data**: JSON-LD for better search engine understanding
- **Sitemap Generation**: Automatic sitemap with blog posts
- **Robots.txt**: Dynamic robots.txt configuration
- **Image Optimization**: Next.js Image component with remote pattern support

### Developer Experience
- **TypeScript**: Full type safety with auto-generated Payload types
- **Server Actions**: Modern data fetching patterns
- **Modular Architecture**: Clean separation of concerns
- **Example Collections**: Extendable with Pages and Services examples
- **Cursor Rules**: Comprehensive development guidelines included

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **CMS**: [Payload CMS 3.50](https://payloadcms.com) with PostgreSQL
- **Storage**: Vercel Blob or local file system
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://radix-ui.com)
- **Typography**: [Geist Font](https://vercel.com/font)
- **Language**: TypeScript
- **Package Manager**: pnpm

## Prerequisites

- Node.js 18.17 or later
- PostgreSQL database
- pnpm (recommended) or npm/yarn
- (Optional) Vercel account for Blob storage

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/zerosyslabs/z0-blog-template.git
cd z0-blog-template
```

### 2. Install dependencies

```bash
pnpm install
```

Then generate the Payload import map:

```bash
pnpm dlx payload generate:importmap
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database Configuration (Required)
DATABASE_URI=postgresql://username:password@localhost:5432/your_database_name

# Payload CMS Secret (Required)
# Generate using: openssl rand -hex 32
PAYLOAD_SECRET=your-super-secret-key-here-make-it-long-and-random

# Vercel Blob Storage (Optional - for production file uploads)
# If not provided, files will be stored locally in /media directory
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# Site Configuration (Optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Environment Variables Explained:**

- `DATABASE_URI`: PostgreSQL connection string
- `PAYLOAD_SECRET`: Secret key for Payload CMS (keep this secure!)
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob storage token (optional, enables cloud storage)
- `NEXT_PUBLIC_SITE_URL`: Your site's URL (used for SEO and metadata)

### 4. Database Setup

Make sure your PostgreSQL database is running and accessible with the credentials provided in `DATABASE_URI`.

### 5. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 6. Access Payload CMS Admin

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to access the Payload CMS admin panel. You'll be prompted to create your first admin user.

## Project Structure

```
z0-blog-template/
├── 📱 app/                    # Next.js App Router
│   ├── (frontend)/           # Public-facing pages
│   │   ├── blog/            # Blog pages
│   │   │   ├── page.tsx     # Blog listing
│   │   │   └── [slug]/      # Individual blog posts
│   │   ├── layout.tsx       # Frontend layout
│   │   └── page.tsx         # Homepage
│   ├── (payload)/           # CMS admin
│   ├── robots.ts            # Dynamic robots.txt
│   └── sitemap.ts           # Dynamic sitemap
├── ⚡ actions/               # Server Actions
│   └── blog.ts              # Blog data fetching
├── 🏗️ collections/          # Payload CMS Collections
│   ├── Media.ts             # Media uploads
│   ├── Posts.ts             # Blog posts
│   ├── Users.ts             # Authentication
│   ├── Pages.ts             # Example: Static pages
│   └── Services.ts          # Example: Services
├── 🧩 components/            # React Components
│   ├── ui/                  # Shadcn/ui components
│   ├── blog/                # Blog components
│   ├── hero-section.tsx     # Hero component
│   └── navbar.tsx           # Navigation
├── 🪝 hooks/                # Custom React Hooks
│   └── use-mobile.ts        # Mobile detection
├── 🛠️ lib/                  # Utilities
│   ├── utils.ts             # Helper functions
│   ├── payload.ts           # Payload client
│   └── metadata.ts          # SEO utilities
├── 🏷️ types/                # TypeScript Types
│   └── blog.ts              # Blog types
├── 📁 public/               # Static Assets
└── 🔧 Configuration Files
```

## Content Management

### Managing Blog Posts

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Click on "Posts" in the sidebar
3. Create a new post with:
   - Title (required)
   - Slug (auto-generated)
   - Excerpt (brief description)
   - Featured Image
   - Content (rich text)
   - Category
   - Author information
   - SEO fields (meta title, description, keywords)
   - Featured flag

### Blog Categories

Default categories included:
- Tech
- Updates
- Tutorials
- News
- General

**To customize categories:** Edit `collections/Posts.ts` and modify the `category` field options.

### Featured Posts

Check the "Is Featured" box in the post editor to highlight a post. Featured posts appear prominently on the blog listing page.

## Storage Configuration

### Local Storage (Default)

Files are stored in the `/media` directory. This is suitable for development and small deployments.

### Vercel Blob Storage (Recommended for Production)

1. Create a Vercel Blob store in your Vercel dashboard
2. Copy the `BLOB_READ_WRITE_TOKEN`
3. Add it to your `.env.local` file
4. The template will automatically use Vercel Blob storage

**Benefits:**
- Unlimited storage
- Global CDN
- Automatic image optimization
- No server disk usage

## Extending the Template

### Adding New Content Types

The template includes example collections (`Pages.ts` and `Services.ts`) to help you extend beyond blogging.

**To enable example collections:**

1. Open `payload.config.ts`
2. Uncomment the imports and collection references:

```typescript
import { Pages } from '@/collections/Pages'
import { Services } from '@/collections/Services'

// In collections array:
collections: [
  Users,
  Posts,
  Media,
  Pages,      // Uncomment
  Services,   // Uncomment
]
```

### Creating Custom Collections

1. Create a new file in `/collections` (e.g., `Events.ts`)
2. Define your schema following Payload CMS patterns
3. Import and add to `payload.config.ts`
4. Create corresponding types in `/types`
5. Create server actions in `/actions`
6. Build your frontend pages

**Example:**

```typescript
// collections/Events.ts
export const Events: CollectionConfig = {
  slug: 'events',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // ... other fields
  ],
}
```

### Customizing SEO

Edit `lib/metadata.ts` to customize:
- Site name
- Default description
- Social media handles
- Structured data schemas

### Customizing Styles

The template uses Tailwind CSS. Customize:
- Colors: Edit `app/(frontend)/globals.css`
- Components: Modify components in `/components`
- Layout: Update layouts in `app/(frontend)/layout.tsx`

## File Organization Principles

### Actions Directory
- Use `'use server'` directive
- Handle errors gracefully
- Return serializable data
- Follow naming: `getX`, `createX`, `updateX`, `deleteX`

### Components Directory
- Keep components small and focused
- Use TypeScript interfaces for props
- Prefer Server Components
- Client components only when necessary

### Types Directory
- Export from specific domain files
- Use descriptive names
- Leverage TypeScript utility types

### Collections Directory
- Clear field names and descriptions
- Proper validation
- Use hooks for auto-generation
- Admin descriptions for editors

## SEO Features

### Automatic Metadata

Every page includes:
- Dynamic title and description
- OpenGraph tags for social sharing
- Twitter Card support
- Canonical URLs
- Robots meta tags

### Sitemap

Automatically generated at `/sitemap.xml` including:
- Homepage
- Blog listing page
- All published blog posts

### Structured Data

JSON-LD structured data for:
- Organization
- Website
- Articles (blog posts)

### Robots.txt

Dynamic robots.txt at `/robots.txt` with proper directives for search engines.

## Build and Deploy

### Build for production

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Recommended Vercel Configuration:**
- Framework Preset: Next.js
- Build Command: `pnpm build`
- Output Directory: (leave default)
- Install Command: `pnpm install`

## Environment Variables for Production

```env
DATABASE_URI=your-production-database-uri
PAYLOAD_SECRET=your-secure-secret
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Ensure all environment variables are set
2. Run `pnpm dlx payload generate:importmap`
3. Delete `.next` folder and rebuild
4. Check that PostgreSQL is accessible

### Database Connection Issues

- Verify `DATABASE_URI` is correct
- Ensure PostgreSQL is running
- Check network connectivity
- Verify database user permissions

### Vercel Blob Issues

- Verify `BLOB_READ_WRITE_TOKEN` is valid
- Check Vercel dashboard for storage limits
- Ensure token has read/write permissions

## Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)

### Cursor AI Integration

This template includes comprehensive Cursor AI rules in `.cursor/rules/z0-blog-template.mdc` to help with:
- Code style enforcement
- Project structure guidance
- Best practices
- Common patterns

## About Zerosyslabs

Visit [zerosyslabs.com](https://www.zerosyslabs.com) to learn more about our mission to strip away complexity from product development.

**From Zero to Hero** - We believe that the most elegant solutions are often the simplest ones.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Open an issue on [GitHub](https://github.com/zerosyslabs/z0-blog-template)
- Email us at [hello@zerosyslabs.com](mailto:hello@zerosyslabs.com)
- Visit [zerosyslabs.com](https://www.zerosyslabs.com)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
