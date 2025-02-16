'use client';

import { useState } from 'react';
import { MusicPreferences } from '@/types';

interface ActivityInputProps {
  onSubmit: (preferences: MusicPreferences) => void;
  isLoading: boolean;
}

function LoadingDots() {
  return (
    <div className="flex space-x-1 items-center justify-center">
      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
}

export default function ActivityInput({ onSubmit, isLoading }: ActivityInputProps) {
  const [activity, setActivity] = useState('');
  const [mood, setMood] = useState<MusicPreferences['mood']>('focused');
  const [tempo, setTempo] = useState<MusicPreferences['tempo']>('moderate');
  const [genre, setGenre] = useState<MusicPreferences['genre']>('ambient');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ activity, mood, tempo, genre });
  };

  return (
    <div className="card space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="activity" className="block text-sm font-medium text-[var(--primary)] mb-2">
            What are you doing?
          </label>
          <input
            type="text"
            id="activity"
            className="input-field"
            placeholder="e.g., coding, studying, reading..."
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="mood" className="block text-sm font-medium text-[var(--primary)] mb-2">
              Mood
            </label>
            <select
              id="mood"
              className="input-field"
              value={mood}
              onChange={(e) => setMood(e.target.value as MusicPreferences['mood'])}
              disabled={isLoading}
            >
              <option value="focused">Focused</option>
              <option value="calm">Calm</option>
              <option value="energetic">Energetic</option>
              <option value="relaxed">Relaxed</option>
            </select>
          </div>

          <div>
            <label htmlFor="tempo" className="block text-sm font-medium text-[var(--primary)] mb-2">
              Tempo
            </label>
            <select
              id="tempo"
              className="input-field"
              value={tempo}
              onChange={(e) => setTempo(e.target.value as MusicPreferences['tempo'])}
              disabled={isLoading}
            >
              <option value="slow">Slow</option>
              <option value="moderate">Moderate</option>
              <option value="fast">Fast</option>
            </select>
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-[var(--primary)] mb-2">
              Genre
            </label>
            <select
              id="genre"
              className="input-field"
              value={genre}
              onChange={(e) => setGenre(e.target.value as MusicPreferences['genre'])}
              disabled={isLoading}
            >
              <option value="ambient">Ambient</option>
              <option value="classical">Classical</option>
              <option value="electronic">Electronic</option>
              <option value="lo-fi">Lo-Fi</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary w-full md:w-auto ${isLoading ? 'opacity-80' : ''}`}
          >
            {isLoading ? <LoadingDots /> : 'Generate Music'}
          </button>
        </div>
      </form>
    </div>
  );
}
