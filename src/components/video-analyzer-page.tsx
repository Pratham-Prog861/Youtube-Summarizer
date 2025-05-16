"use client";

import type { NextPage } from 'next';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { summarizeVideo, type SummarizeVideoOutput } from '@/ai/flows/summarize-video';
import { extractKeyPoints, type ExtractKeyPointsOutput } from '@/ai/flows/extract-key-points';
import { generateTimestamps, type GenerateTimestampsOutput } from '@/ai/flows/generate-timestamps';
import { Link2, Wand2, FileText, ListChecks, Timer, Loader2, AlertTriangle } from 'lucide-react';

const formSchema = z.object({
  videoUrl: z.string().url({ message: "Please enter a valid URL." }),
});

type FormValues = z.infer<typeof formSchema>;

type VideoAnalysisResults = {
  summary: string;
  keyPoints: string[];
  timestamps: string;
};

const VideoAnalyzerPage: NextPage = () => {
  const [results, setResults] = useState<VideoAnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      // Step 1: Get video summary
      const summaryOutput: SummarizeVideoOutput = await summarizeVideo({ videoLink: data.videoUrl });
      if (!summaryOutput || !summaryOutput.summary) {
        throw new Error("Failed to generate video summary or summary is empty.");
      }
      const currentSummary = summaryOutput.summary;

      // Step 2: Get key points using the summary as transcript
      const keyPointsOutput: ExtractKeyPointsOutput = await extractKeyPoints({ videoTranscript: currentSummary });
      if (!keyPointsOutput || !keyPointsOutput.keyPoints) {
        throw new Error("Failed to extract key points or key points are empty.");
      }
      const currentKeyPoints = keyPointsOutput.keyPoints;
      
      // Step 3: Get timestamps using summary as transcript, and basic title/description
      const timestampsOutput: GenerateTimestampsOutput = await generateTimestamps({
        videoTitle: `Video Analysis for ${data.videoUrl}`,
        videoDescription: `Content from ${data.videoUrl}`,
        videoTranscript: currentSummary,
      });
      if (!timestampsOutput || !timestampsOutput.timestampedOutline) {
        throw new Error("Failed to generate timestamps or timestamps are empty.");
      }
      const currentTimestamps = timestampsOutput.timestampedOutline;

      setResults({
        summary: currentSummary,
        keyPoints: currentKeyPoints,
        timestamps: currentTimestamps,
      });
      toast({
        title: "Analysis Complete",
        description: "Video insights generated successfully.",
      });

    } catch (err: any) {
      console.error("Analysis error:", err);
      const errorMessage = err.message || "An unexpected error occurred during analysis.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 bg-background text-foreground font-sans"> {/* Removed min-h-screen */}
      <main className="w-full max-w-3xl space-y-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center text-2xl">
              <Link2 className="mr-2 h-6 w-6 text-primary" />
              Input Video Link
            </CardTitle>
            <CardDescription className="text-base">
              Provide a YouTube video URL to start the analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-2 space-y-2 sm:space-y-0">
                <Input
                  id="videoUrl"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=example"
                  {...register("videoUrl")}
                  className={`flex-grow ${errors.videoUrl ? 'border-destructive ring-destructive' : ''}`}
                  aria-invalid={errors.videoUrl ? "true" : "false"}
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Analyze
                </Button>
              </div>
              {errors.videoUrl && <p className="text-sm text-destructive">{errors.videoUrl.message}</p>}
            </form>
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="shadow-xl">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="h-12 w-12 animate-spin text-primary" /> {/* Removed inline style */}
              <p className="text-lg text-muted-foreground">Analyzing video... This may take a moment.</p>
              <p className="text-muted-foreground">Please wait while we generate insights for you.</p>
            </CardContent>
          </Card>
        )}

        {error && !isLoading && (
          <Alert variant="destructive" className="shadow-lg">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results && !isLoading && (
          <Tabs defaultValue="summary" className="w-full shadow-xl rounded-lg overflow-hidden">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="summary" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"> {/* Removed inline style, added text-muted-foreground for default */}
                <FileText className="mr-2 h-5 w-5" /> Summary
              </TabsTrigger>
              <TabsTrigger value="keyPoints" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"> {/* Removed inline style, added text-muted-foreground for default */}
                <ListChecks className="mr-2 h-5 w-5" /> Key Points
              </TabsTrigger>
              <TabsTrigger value="timestamps" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"> {/* Removed inline style, added text-muted-foreground for default */}
                <Timer className="mr-2 h-5 w-5" /> Timestamps
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Video Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-60 w-full rounded-md border p-4">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{results.summary}</p>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keyPoints">
              <Card>
                <CardHeader>
                  <CardTitle>Important Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-60 w-full rounded-md border p-4">
                    {results.keyPoints.length > 0 ? (
                      <ul className="space-y-2 list-disc list-inside">
                        {results.keyPoints.map((point, index) => (
                          <li key={index} className="text-sm leading-relaxed">{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No key points extracted.</p>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timestamps">
              <Card>
                <CardHeader>
                  <CardTitle>Timestamps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-60 w-full rounded-md border p-4">
                    <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono">{results.timestamps}</pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default VideoAnalyzerPage;
