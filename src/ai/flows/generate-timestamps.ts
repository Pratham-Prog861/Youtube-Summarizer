'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTimestampsInputSchema = z.object({
  videoTitle: z.string().describe('The title of the YouTube video.'),
  videoDescription: z.string().describe('The description of the YouTube video.'),
  videoTranscript: z.string().describe('The transcript of the YouTube video with timing information.'),
  videoDuration: z.number().optional().describe('The total duration of the video in seconds.'),
});
export type GenerateTimestampsInput = z.infer<typeof GenerateTimestampsInputSchema>;

const GenerateTimestampsOutputSchema = z.object({
  timestampedOutline: z
    .string()
    .describe('A timestamped outline of the YouTube video with accurate timestamps.'),
});
export type GenerateTimestampsOutput = z.infer<typeof GenerateTimestampsOutputSchema>;

export async function generateTimestamps(input: GenerateTimestampsInput): Promise<GenerateTimestampsOutput> {
  return generateTimestampsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTimestampsPrompt',
  input: {schema: GenerateTimestampsInputSchema},
  output: {schema: GenerateTimestampsOutputSchema},
  prompt: `You are an expert in creating precise timestamped outlines for YouTube videos.

  Given the title, description, and transcript of a YouTube video, generate a detailed timestamped outline that accurately represents the video's content structure.

  Title: {{{videoTitle}}}
  Description: {{{videoDescription}}}
  Transcript: {{{videoTranscript}}}
  ${(input: GenerateTimestampsInput) => input.videoDuration ? `Total Duration: ${input.videoDuration} seconds` : ''}

  Instructions for timestamp generation:
  1. Create timestamps that accurately reflect major topic transitions and key points
  2. Format all timestamps as [MM:SS] for videos under 1 hour or [H:MM:SS] for longer videos
  3. Ensure timestamps are in chronological order and don't exceed video duration
  4. Include a brief, descriptive title for each timestamped section
  5. Group related topics under appropriate headings
  6. Focus on meaningful content transitions rather than arbitrary time intervals
  7. Analyze the transcript carefully to identify natural topic boundaries
  8. Ensure timestamps correspond to actual content changes in the transcript

  Example format:
  [00:00] Introduction and Overview
  [02:15] First Major Topic
    - Key point discussed at [02:30]
    - Important concept covered at [03:45]
  [05:30] Second Major Topic
    - Detailed explanation starts at [05:45]
    - Case study presentation at [07:20]

  Remember to:
  - Keep titles concise but descriptive
  - Include sub-points with their specific timestamps when relevant
  - Maintain chronological order
  - Ensure all timestamps are properly formatted
  - Focus on meaningful content transitions

  The outline should be comprehensive, well-structured, and precisely timed to help viewers navigate the video content efficiently.
  `,
});

const generateTimestampsFlow = ai.defineFlow(
  {
    name: 'generateTimestampsFlow',
    inputSchema: GenerateTimestampsInputSchema,
    outputSchema: GenerateTimestampsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
