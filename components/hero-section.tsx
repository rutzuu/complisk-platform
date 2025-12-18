import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-6">
            From Zero to Hero
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            Zerosyslabs{" "}
            <span className="text-muted-foreground">Blog Template</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
            A modern, clean blog template built with Next.js, Payload CMS, and Tailwind CSS. 
            Perfect for developers who want to strip away complexity and focus on content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" asChild>
              <Link 
                href="https://www.zerosyslabs.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Visit Our Website
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link 
                href="https://github.com/zerosyslabs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Zero Complexity</h3>
                <p className="text-sm text-muted-foreground">
                  Clean, minimal design that focuses on your content
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Hero Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Optimized for speed with Next.js and modern technologies
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Developer First</h3>
                <p className="text-sm text-muted-foreground">
                  Built with TypeScript, Tailwind CSS, and best practices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
