import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Complisk Platform",
  description: "A lightweight, location-based promotion platform for small businesses. Create time-limited promotional offers with QR codes, and let customers browse active deals by category and location.",
  keywords: ["complisk", "promotions", "local deals", "QR codes", "small business", "location-based", "deals", "offers"],
  authors: [{ name: "Complisk" }],
  openGraph: {
    title: "Complisk Platform",
    description: "Local deal discovery + QR redemption. Browse time-limited promotional offers from small businesses near you.",
    siteName: "Complisk",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complisk Platform",
    description: "Local deal discovery + QR redemption. Browse time-limited promotional offers from small businesses near you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  );
}
