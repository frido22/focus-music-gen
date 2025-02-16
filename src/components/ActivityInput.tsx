'use client';

import { useState } from 'react';
import { MusicPreferences } from '@/types';
import MotivationalMessage from './MotivationalMessage';
import PreferenceSelects from './PreferenceSelects';

interface ActivityInputProps {
  onSubmit: (preferences: MusicPreferences) => void;
  isLoading: boolean;
}

export default function ActivityInput({ onSubmit, isLoading }: ActivityInputProps) {
  const [activity, setActivity] = useState('');
  const [mood, setMood] = useState('focused');
  const [tempo, setTempo] = useState('moderate');
  const [genre, setGenre] = useState('ambient');
  const [duration, setDuration] = useState<'30' | '60' | '90' | '120'>('30');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ activity, mood, tempo, genre, duration });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <MotivationalMessage />
      
      <div>
        <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1">
          What are you doing?
        </label>
        <input
          type="text"
          id="activity"
          placeholder="e.g., coding, studying, reading..."
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>

      <PreferenceSelects
        mood={mood}
        setMood={setMood}
        tempo={tempo}
        setTempo={setTempo}
        genre={genre}
        setGenre={setGenre}
        duration={duration}
        setDuration={setDuration}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? 'Creating your focus music...' : 'Generate Music'}
      </button>
    </form>
  );
}
