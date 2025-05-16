// 'use server';
/**
 * @fileOverview A YouTube video summarization AI agent.
 *
 * - summarizeVideo - A function that handles the video summarization process.
 * - SummarizeVideoInput - The input type for the summarizeVideo function.
 * - SummarizeVideoOutput - The return type for the summarizeVideo function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeVideoInputSchema = z.object({
  videoLink: z.string().describe('The link to the YouTube video.'),
});
export type SummarizeVideoInput = z.infer<typeof SummarizeVideoInputSchema>;

const SummarizeVideoOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the video content.'),
});
export type SummarizeVideoOutput = z.infer<typeof SummarizeVideoOutputSchema>;

export async function summarizeVideo(input: SummarizeVideoInput): Promise<SummarizeVideoOutput> {
  return summarizeVideoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeVideoPrompt',
  input: {schema: SummarizeVideoInputSchema},
  output: {schema: SummarizeVideoOutputSchema},
  prompt: `You are an AI expert in summarizing YouTube videos. Provide a concise summary of the video content from the following link: {{{videoLink}}}. The summary should capture the main topics and key points discussed in the video.`, // Ensure to modify this prompt if external data retrieval is implemented
});

const summarizeVideoFlow = ai.defineFlow(
  {
    name: 'summarizeVideoFlow',
    inputSchema: SummarizeVideoInputSchema,
    outputSchema: SummarizeVideoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
