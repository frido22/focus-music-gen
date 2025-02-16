import { MusicPreferences } from '@/types';
import { buildBasePrompt, buildReplicatePrompt } from '@/utils/promptBuilder';
import { refinePrompt } from '@/lib/openai';
import { generateMusic } from '@/lib/replicate';

export async function generateMusicFromPreferences(preferences: MusicPreferences): Promise<string> {
  // Build and refine the prompt
  const basePrompt = buildBasePrompt(preferences);
  const refinedPrompt = await refinePrompt(basePrompt);
  
  // Generate music using Replicate
  const replicateInput = buildReplicatePrompt(refinedPrompt);
  const audioUrl = await generateMusic(replicateInput);
  
  if (!audioUrl) {
    throw new Error('No audio URL returned from Replicate');
  }
  
  return audioUrl;
}
