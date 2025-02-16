'use client';

import { useEffect, useRef, useState } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface AudioPlayerProps {
  audioUrl: string;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.loop = isLooping;
      setIsPlaying(false);
      setError(null);
    }
  }, [audioUrl, isLooping]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error('Audio playback error:', err);
          setError('Failed to play audio. Please try again.');
        });
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        loop={isLooping}
        onEnded={() => !isLooping && setIsPlaying(false)}
        onError={(e) => {
          console.error('Audio error:', e);
          setError('Failed to load audio. Please try again.');
        }}
      />
      
      {error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="flex space-x-4 items-center">
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {isPlaying ? (
              <PauseIcon className="h-8 w-8" />
            ) : (
              <PlayIcon className="h-8 w-8" />
            )}
          </button>
          
          <button
            onClick={toggleLoop}
            className={`p-2 rounded-full ${
              isLooping ? 'bg-green-600' : 'bg-gray-400'
            } text-white hover:opacity-80 transition-colors`}
            title={isLooping ? 'Looping enabled' : 'Looping disabled'}
          >
            <ArrowPathIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
