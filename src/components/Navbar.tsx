"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80; // Height of your navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const NavLinks = ({ className = "", onClick = () => {} }) => (
    <nav className={`flex ${className}`}>
      <a 
        href="#analyzer" 
        onClick={(e) => {
          scrollToSection(e, 'analyzer');
          onClick();
        }}
        className="relative group text-muted-foreground hover:text-primary transition-colors duration-300 py-2 px-3"
      >
        <span>Analyzer</span>
        <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-[calc(100%-24px)]"></span>
      </a>
      <a 
        href="#features" 
        onClick={(e) => {
          scrollToSection(e, 'features');
          onClick();
        }}
        className="relative group text-muted-foreground hover:text-primary transition-colors duration-300 py-2 px-3"
      >
        <span>Features</span>
        <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-[calc(100%-24px)]"></span>
      </a>
      <a 
        href="#testimonials" 
        onClick={(e) => {
          scrollToSection(e, 'testimonials');
          onClick();
        }}
        className="relative group text-muted-foreground hover:text-primary transition-colors duration-300 py-2 px-3"
      >
        <span>Testimonials</span>
        <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-[calc(100%-24px)]"></span>
      </a>
    </nav>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`container mx-auto px-4 sm:px-8 py-5 flex justify-between items-center sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
          scrolled 
            ? 'bg-background/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/20 supports-[backdrop-filter]:bg-background/20' 
            : 'bg-background/40 supports-[backdrop-filter]:bg-background/10'
        }`}
      >
        <Link href="/" className="relative group">
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:opacity-80 transition-opacity px-2">
            YT Summarizer
          </span>
          <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-[calc(100%-16px)]"></span>
        </Link>

        {/* Desktop Navigation Only */}
        <div className="hidden md:block">
          <NavLinks className="items-center space-x-8" />
        </div>
      </motion.header>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent backdrop-blur-sm" />
      </div>
    </>
  );
};

export default Navbar;