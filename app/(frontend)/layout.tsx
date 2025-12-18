import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zerosyslabs Blog Template",
  description: "A modern, clean blog template built with Next.js, Payload CMS, and Tailwind CSS. From Zero to Hero.",
  keywords: ["blog", "template", "nextjs", "payload", "tailwind", "zerosyslabs"],
  authors: [{ name: "Zerosyslabs", url: "https://www.zerosyslabs.com" }],
  openGraph: {
    title: "Zerosyslabs Blog Template",
    description: "A modern, clean blog template built with Next.js, Payload CMS, and Tailwind CSS. From Zero to Hero.",
    url: "https://www.zerosyslabs.com",
    siteName: "Zerosyslabs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zerosyslabs Blog Template",
    description: "A modern, clean blog template built with Next.js, Payload CMS, and Tailwind CSS. From Zero to Hero.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  );
}
