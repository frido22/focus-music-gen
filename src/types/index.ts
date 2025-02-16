export interface MusicPreferences {
  activity: string;
  mood?: 'focused' | 'calm' | 'energetic' | 'relaxed';
  tempo?: 'slow' | 'moderate' | 'fast';
  genre?: 'ambient' | 'classical' | 'electronic' | 'lo-fi';
}

export interface StartGenerationResponse {
  success: boolean;
  predictionId?: string;
  error?: string;
}

export interface StatusResponse {
  success: boolean;
  status?: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  output?: string;
  error?: string;
}

export interface GenerationResponse {
  success: boolean;
  audioUrl?: string;
  error?: string;
}
