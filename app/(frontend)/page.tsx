import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import { SidescrollLanding } from '@/components/sidescroll-landing';

export const metadata: Metadata = generateSEOMetadata();

export default function Home() {
  return <SidescrollLanding />;
}
