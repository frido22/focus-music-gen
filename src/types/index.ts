export interface MusicPreferences {
  activity: string;
  mood?: string;
  tempo?: string;
  genre?: string;
}

export interface GenerationResponse {
  success: boolean;
  audioUrl?: string;
  error?: string;
}

export interface PromptConfig {
  activity: string;
  preferences: MusicPreferences;
  duration: number;
}
