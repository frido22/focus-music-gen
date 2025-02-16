'use client';

import { useEffect, useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface AudioPlayerProps {
  audioUrl: string;
  duration?: string;
}

export default function AudioPlayer({ audioUrl, duration = '30' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loopCount, setLoopCount] = useState(0);
  const maxLoops = Math.floor(parseInt(duration) * 60 / 30); // 30 seconds per loop

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.loop = true;
      setIsPlaying(false);
      setError(null);
      setLoopCount(0);
    }
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setLoopCount(prev => {
        const newCount = prev + 1;
        if (newCount >= maxLoops) {
          audio.pause();
          setIsPlaying(false);
          return 0;
        }
        return newCount;
      });
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, [maxLoops]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .catch(err => {
          console.error('Audio error:', err);
          setError('Unable to play audio');
        })
        .then(() => {
          setIsPlaying(true);
          setLoopCount(0);
        });
    }
  };

  const formatTime = (minutes: number) => {
    return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;
  };

  const remainingTime = Math.max(0, parseInt(duration) - (loopCount * 30 / 60));

  if (error) {
    return (
      <div className="card">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <audio
        ref={audioRef}
        src={audioUrl}
        loop={true}
        onEnded={() => setIsPlaying(false)}
        onError={() => setError('Unable to load audio')}
      />
      
      <div className="flex flex-col items-center space-y-4">
        <div className="player-ring">
          <button
            onClick={togglePlay}
            className="player-button"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <PauseIcon className="h-8 w-8 text-indigo-600" />
            ) : (
              <PlayIcon className="h-8 w-8 text-indigo-600" />
            )}
          </button>
        </div>

        <div className="text-sm text-gray-600">
          {isPlaying ? `${formatTime(remainingTime)} remaining` : `${formatTime(parseInt(duration))} focus session`}
        </div>
      </div>
    </div>
  );
}
