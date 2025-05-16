"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, List, Zap} from 'lucide-react';

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
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform how you consume video content with our comprehensive feature set
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border hover:border-primary/50 transition-colors duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;