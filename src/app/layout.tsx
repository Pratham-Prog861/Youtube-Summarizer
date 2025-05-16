import type { Metadata } from 'next';
import { Geist_Sans } from 'geist/font/sans'; // Corrected import path
import { Geist_Mono } from 'geist/font/mono'; // Corrected import path
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Video Insights Analyzer',
  description: 'Analyze YouTube videos for summaries, key points, and timestamps.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
