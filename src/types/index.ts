export interface MusicPreferences {
  activity: string;
  mood?: string;
  tempo?: string;
  genre?: string;
  duration?: '30' | '60' | '90' | '120';
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
