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
  prompt: `You are an AI expert in summarizing YouTube videos. Analyze the video content from the following link: {{{videoLink}}} and provide a comprehensive summary that includes:

1. Main Topic Overview: Start with a brief overview of the video's main subject
2. Key Concepts: Break down the major concepts discussed
3. Detailed Explanation: Provide a clear, structured explanation of the content
4. Examples and Applications: Include any practical examples or applications mentioned
5. Conclusions: Summarize the main takeaways

Format the summary in clear paragraphs with proper transitions. Use simple language while maintaining accuracy and depth.
Ensure the summary is both comprehensive and easily digestible for the average viewer.`,
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
