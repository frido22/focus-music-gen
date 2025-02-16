'use client';

import { useState } from 'react';
import { MusicPreferences, GenerationResponse } from '@/types';
import ActivityInput from './ActivityInput';
import AudioPlayer from './AudioPlayer';

export default function MusicGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (preferences: MusicPreferences) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      const data: GenerationResponse = await response.json();

      if (!data.success || !data.audioUrl) {
        throw new Error(data.error || 'Failed to generate music');
      }

      setAudioUrl(data.audioUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <ActivityInput onSubmit={handleGenerate} isLoading={isLoading} />
      
      {error && (
        <div className="text-red-600 text-center">
          {error}
        </div>
      )}

      {audioUrl && !error && (
        <AudioPlayer audioUrl={audioUrl} />
      )}
    </div>
  );
}
