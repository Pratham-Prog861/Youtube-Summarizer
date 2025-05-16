"use client"
import { motion } from "framer-motion"
import VideoAnalyzerPage from "@/components/video-analyzer-page"
import Footer from "@/components/Footer"
import { useEffect } from "react"
import TestimonialsSection from "@/components/testimonials-section";
import FeaturesSection from "@/components/Features"

export default function Page() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pt-6 sm:pt-10"
        >
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            YouTube Video Insights
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Transform your YouTube videos into concise summaries, key points, and timestamps using advanced AI technology.
          </p>
        </motion.div>

        <motion.div
          id="analyzer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <VideoAnalyzerPage />
        </motion.div>
        
        <motion.div
          id="features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <FeaturesSection />
        </motion.div>

        <motion.div
          id="testimonials"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16" 
        >
          <TestimonialsSection />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
