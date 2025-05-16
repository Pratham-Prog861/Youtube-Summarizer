import { Github, Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 bg-background/95 backdrop-blur">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" fill="currentColor" />
            <span>by</span>
            <Link
              href="https://www.linkedin.com/in/pratham-darji-b704092a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Pratham Darji
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link
              href="https://github.com/Pratham-Prog861"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2 group"
            >
              <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">View on GitHub</span>
            </Link>
          </div>
          
          <p className="text-xs text-center text-muted-foreground max-w-md">
            Transform your YouTube experience with our AI-powered video insights tool. 
            Save time and extract key information effortlessly.
          </p>

          <div className="text-xs text-muted-foreground flex items-center space-x-1">
            <span>©</span>
            <span>{currentYear}</span>
            <span>YT Summarizer.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer