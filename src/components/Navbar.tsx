"use client"
import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
        YT Summarizer
      </Link>
      <div className="flex items-center space-x-6">
        <a 
          href="#analyzer" 
          onClick={(e) => scrollToSection(e, 'analyzer')}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Analyzer
        </a>
        <a 
          href="#testimonials" 
          onClick={(e) => scrollToSection(e, 'testimonials')}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Testimonials
        </a>
      </div>
    </header>
  );
};

export default Navbar;