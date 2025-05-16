// extract-key-points.ts
'use server';

/**
 * @fileOverview Extracts key takeaways and important points from a YouTube video.
 *
 * - extractKeyPoints - A function that extracts key points from the video.
 * - ExtractKeyPointsInput - The input type for the extractKeyPoints function.
 * - ExtractKeyPointsOutput - The return type for the extractKeyPoints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractKeyPointsInputSchema = z.object({
  videoTranscript: z.string().describe('The transcript of the YouTube video.'),
});

export type ExtractKeyPointsInput = z.infer<typeof ExtractKeyPointsInputSchema>;

const ExtractKeyPointsOutputSchema = z.object({
  keyPoints: z.array(z.string()).describe('Key takeaways from the video.'),
});

export type ExtractKeyPointsOutput = z.infer<typeof ExtractKeyPointsOutputSchema>;

export async function extractKeyPoints(input: ExtractKeyPointsInput): Promise<ExtractKeyPointsOutput> {
  return extractKeyPointsFlow(input);
}

const extractKeyPointsPrompt = ai.definePrompt({
  name: 'extractKeyPointsPrompt',
  input: {schema: ExtractKeyPointsInputSchema},
  output: {schema: ExtractKeyPointsOutputSchema},
  prompt: `You are an expert in extracting and organizing key insights from video transcripts. Analyze the following transcript and identify the most important points, ensuring they are:

1. Clear and Concise: Each point should be easily understood
2. Hierarchically Organized: Group related points together
3. Contextually Rich: Include enough context to make sense independently
4. Action-Oriented: When applicable, include actionable takeaways
5. Properly Prioritized: Most important points first

Transcript:
{{{videoTranscript}}}

Extract and format the key points to maximize understanding and retention.`,
});

const extractKeyPointsFlow = ai.defineFlow(
  {
    name: 'extractKeyPointsFlow',
    inputSchema: ExtractKeyPointsInputSchema,
    outputSchema: ExtractKeyPointsOutputSchema,
  },
  async input => {
    const {output} = await extractKeyPointsPrompt(input);
    return output!;
  }
);
