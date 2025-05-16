"use client";

import React from 'react';
import TestimonialCard from './testimonial-card';
import { motion } from 'framer-motion';

// Sample data - in a real app, this would likely come from a CMS or database
const testimonialsData = [
  {
    id: 1,
    name: "Alex P.",
    rating: 5,
    testimonial: "This website is a game-changer! The AI summaries are incredibly accurate and save me so much time. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder avatar
    date: "2023-10-26",
  },
  {
    id: 2,
    name: "Sarah K.",
    rating: 4,
    testimonial: "I love how easy it is to get key points from long videos. The timestamp feature is also super helpful for navigation.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg", // Placeholder avatar
    date: "2023-11-15",
  },
  {
    id: 3,
    name: "Mike B.",
    rating: 5,
    testimonial: "Fantastic tool for students and researchers. The insights generated are top-notch. The dark mode is a nice touch too!",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg", // Placeholder avatar
    date: "2023-12-01",
  },
];

const TestimonialsSection: React.FC = () => {
  // Duplicate the testimonials data multiple times to create a longer seamless loop
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  return (
    <section className="py-12 md:py-16 bg-secondary/50 dark:bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Why Our Customers Love Us
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear directly from users who have transformed their video consumption with our AI-powered insights.
          </p>
        </div>
        <div className="relative">
          <motion.div
            className="flex gap-8 py-4"
            animate={{
              x: [0, -1920], // Adjust this value based on your content width
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`} 
                className="flex-shrink-0 w-[350px] hover:scale-105 transition-transform duration-300"
              >
                <TestimonialCard
                  name={testimonial.name}
                  rating={testimonial.rating}
                  testimonial={testimonial.testimonial}
                  avatar={testimonial.avatar}
                  date={testimonial.date}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;