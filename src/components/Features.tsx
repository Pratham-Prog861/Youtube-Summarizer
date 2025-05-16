"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, List, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "AI-Powered Summaries",
    description: "Get concise, accurate summaries of any YouTube video using advanced AI technology."
  },
  {
    icon: <List className="h-8 w-8 text-primary" />,
    title: "Key Points Extraction",
    description: "Extract the most important points and insights from videos automatically."
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Timestamped Navigation",
    description: "Jump to specific parts of the video with automatically generated timestamps."
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Real-Time Processing",
    description: "Quick and efficient video analysis with live progress updates."
  }
];

const FeaturesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background/0 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Powerful Features
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform how you consume video content with our comprehensive feature set
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <Card className="border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4 group-hover:scale-105 transition-transform duration-300">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;