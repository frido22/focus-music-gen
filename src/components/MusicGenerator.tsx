'use client';

import { useState } from 'react';
import { MusicPreferences } from '@/types';
import ActivityInput from './ActivityInput';
import AudioPlayer from './AudioPlayer';
import Layout from './Layout';

const POLLING_INTERVAL = 2000; // 2 seconds
const MAX_POLLING_ATTEMPTS = 60; // 2 minutes total

type GenerationStatus = 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';

function LoadingSkeleton({ status }: { status: GenerationStatus }) {
  const messages = {
    starting: 'Starting music generation...',
    processing: 'Creating your unique music piece...',
    succeeded: 'Almost ready...',
    failed: 'Generation failed',
    canceled: 'Generation canceled'
  };

  return (
    <div className="card animate-pulse">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full w-48"></div>
        <p className="text-sm text-gray-500">{messages[status]}</p>
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
  const [status, setStatus] = useState<GenerationStatus>('starting');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pollStatus = async (predictionId: string) => {
    let attempts = 0;
    
    const poll = async () => {
      if (attempts >= MAX_POLLING_ATTEMPTS) {
        setError('Generation timed out. Please try again.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/generate/status?id=${predictionId}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error);
        }

        if (data.status === 'succeeded' && data.output) {
          setAudioUrl(data.output);
          setStatus('succeeded');
          setIsLoading(false);
          return;
        }

        if (data.status === 'failed' || data.error) {
          setStatus('failed');
          throw new Error(data.error || 'Generation failed');
        }

        if (data.status === 'canceled') {
          setStatus('canceled');
          throw new Error('Generation was canceled');
        }

        // Still processing, continue polling
        setStatus('processing');
        attempts++;
        setTimeout(poll, POLLING_INTERVAL);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };

    await poll();
  };

  const handleGenerate = async (preferences: MusicPreferences) => {
    setIsLoading(true);
    setError(null);
    setAudioUrl(null);
    setStatus('starting');

    try {
      // Start generation
      const response = await fetch('/api/generate/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();

      if (!data.success || !data.predictionId) {
        throw new Error(data.error || 'Failed to start generation');
      }

      // Start polling for status
      await pollStatus(data.predictionId);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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

        {isLoading && <LoadingSkeleton status={status} />}

        {audioUrl && !error && !isLoading && (
          <div className="card fade-in">
            <AudioPlayer audioUrl={audioUrl} />
          </div>
        )}
      </div>
    </Layout>
  );
}
