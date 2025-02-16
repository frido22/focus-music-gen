'use client';

import { useState } from 'react';
import { MusicPreferences, GenerationResponse } from '@/types';
import ActivityInput from './ActivityInput';
import AudioPlayer from './AudioPlayer';
import Layout from './Layout';

const TIMEOUT_DURATION = 65000; // 65 seconds (slightly longer than server timeout)

function LoadingSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full w-48"></div>
        <div className="flex space-x-3">
          <div className="h-2 bg-gray-200 rounded-full w-3"></div>
          <div className="h-2 bg-gray-200 rounded-full w-3"></div>
          <div className="h-2 bg-gray-200 rounded-full w-3"></div>
        </div>
      </div>
    </div>
  );
}

export default function MusicGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (preferences: MusicPreferences) => {
    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(preferences),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate music');
      }

      const data: GenerationResponse = await response.json();
      if (!data.success || !data.audioUrl) {
        throw new Error(data.error || 'Failed to generate music');
      }

      setAudioUrl(data.audioUrl);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Music generation is taking longer than expected. Please try again.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An error occurred');
      }
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <ActivityInput onSubmit={handleGenerate} isLoading={isLoading} />
        
        {error && (
          <div className="card bg-red-50 border-red-100">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {isLoading && <LoadingSkeleton />}

        {audioUrl && !error && !isLoading && (
          <div className="card fade-in">
            <AudioPlayer audioUrl={audioUrl} />
          </div>
        )}
      </div>
    </Layout>
  );
}
