import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t py-6">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Made by Pratham Darji
          </p>
          <Link
            href="https://github.com/Pratham-Prog861"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </footer>
  )
}

export default Footer