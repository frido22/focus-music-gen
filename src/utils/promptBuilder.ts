import { MusicPreferences } from '@/types';

export const buildBasePrompt = (preferences: MusicPreferences): string => {
  const { activity, mood = 'focused', tempo = 'moderate', genre = 'ambient' } = preferences;
  
  const sections = [
    // Main description
    `Create a ${mood} ${genre} music piece with ${tempo} tempo that's perfect for ${activity}.`,
    
    // Looping requirements
    `This composition must be designed for seamless looping with:
    - Smooth transitions between end and beginning
    - Consistent energy and rhythm throughout
    - No abrupt changes or noticeable loop points
    - Natural flow from ending back to start
    - Consistent tone for continuous play`,
    
    // Purpose and goal
    `The music should enhance concentration and productivity while remaining non-intrusive, 
    creating a cohesive atmosphere that can play indefinitely without becoming distracting.`
  ];

  // Join sections with double newlines for clear separation
  return sections.join('\n\n');
};

export const buildReplicatePrompt = (openAiRefinedPrompt: string): object => {
  return {
    prompt: openAiRefinedPrompt,
    model_version: "stereo-large",
    output_format: "mp3",
    normalization_strategy: "peak",
    duration: 10,
    seamless: true
  };
};
