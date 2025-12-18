import { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import BlogsSection from "@/components/blog/blogs-section"
import { generateMetadata as generateSEOMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateSEOMetadata()

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BlogsSection />
    </div>
  )
}
