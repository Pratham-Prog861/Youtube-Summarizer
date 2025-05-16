"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star } from 'lucide-react'; // Assuming you have lucide-react for icons

interface TestimonialCardProps {
  rating: number; // e.g., 4 or 5
  name: string;
  testimonial: string;
  avatar?: string; // Optional: URL to user's avatar
  date?: string; // Optional: Date of the testimonial
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  rating,
  name,
  testimonial,
  avatar,
  date,
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="shadow-lg w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {avatar && (
              <img src={avatar} alt={name} className="h-10 w-10 rounded-full" />
            )}
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              {date && <CardDescription className="text-xs">{date}</CardDescription>}
            </div>
          </div>
          <div className="flex items-center">{renderStars()}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          "{testimonial}"
        </p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;