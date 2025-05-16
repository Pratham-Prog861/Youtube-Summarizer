'use server';
/**
 * @fileOverview Generates a timestamped outline for a YouTube video.
 *
 * - generateTimestamps - A function that generates the timestamped outline.
 * - GenerateTimestampsInput - The input type for the generateTimestamps function.
 * - GenerateTimestampsOutput - The return type for the generateTimestamps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTimestampsInputSchema = z.object({
  videoTitle: z.string().describe('The title of the YouTube video.'),
  videoDescription: z.string().describe('The description of the YouTube video.'),
  videoTranscript: z.string().describe('The transcript of the YouTube video.'),
});
export type GenerateTimestampsInput = z.infer<typeof GenerateTimestampsInputSchema>;

const GenerateTimestampsOutputSchema = z.object({
  timestampedOutline: z
    .string()
    .describe('A timestamped outline of the YouTube video.'),
});
export type GenerateTimestampsOutput = z.infer<typeof GenerateTimestampsOutputSchema>;

export async function generateTimestamps(input: GenerateTimestampsInput): Promise<GenerateTimestampsOutput> {
  return generateTimestampsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTimestampsPrompt',
  input: {schema: GenerateTimestampsInputSchema},
  output: {schema: GenerateTimestampsOutputSchema},
  prompt: `You are an expert in creating timestamped outlines for YouTube videos.

  Given the title, description, and transcript of a YouTube video, generate a timestamped outline that allows viewers to quickly navigate to specific sections of interest.

  Title: {{{videoTitle}}}
  Description: {{{videoDescription}}}
  Transcript: {{{videoTranscript}}}

  The outline should be well-structured, easy to read, and include relevant timestamps for each section.  Timestamps should be formatted as MM:SS or H:MM:SS.
  Ensure the outline covers the main topics and key points discussed in the video.
  The timestamped outline should be comprehensive and accurate.
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
