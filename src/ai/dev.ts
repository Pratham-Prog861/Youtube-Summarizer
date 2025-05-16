import { config } from 'dotenv';

config();

import '@/ai/flows/generate-timestamps.ts';
import '@/ai/flows/extract-key-points.ts';
import '@/ai/flows/summarize-video.ts';