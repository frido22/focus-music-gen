import { MusicPreferences } from '@/types';

export const buildBasePrompt = (preferences: MusicPreferences): string => {
  const { activity, mood = 'focused', tempo = 'moderate', genre = 'ambient' } = preferences;
  
  return `Create a ${mood} ${genre} music piece with ${tempo} tempo that's perfect for ${activity}. 
    The music should enhance concentration and productivity while being non-intrusive.`;
};

export const buildReplicatePrompt = (openAiRefinedPrompt: string): object => {
  return {
    prompt: openAiRefinedPrompt,
    model_version: "stereo-large",
    output_format: "mp3",
    normalization_strategy: "peak",
    duration: 10
  };
};
