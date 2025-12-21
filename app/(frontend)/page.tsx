import { Metadata } from "next"
import { SidescrollLanding } from "@/components/sidescroll-landing"
import { generateMetadata as generateSEOMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateSEOMetadata()

export default function Home() {
  return <SidescrollLanding />
}
