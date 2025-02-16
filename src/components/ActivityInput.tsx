'use client';

import { useState } from 'react';
import { MusicPreferences } from '@/types';

interface ActivityInputProps {
  onSubmit: (preferences: MusicPreferences) => void;
  isLoading: boolean;
}

export default function ActivityInput({ onSubmit, isLoading }: ActivityInputProps) {
  const [preferences, setPreferences] = useState<MusicPreferences>({
    activity: '',
    mood: 'focused',
    tempo: 'moderate',
    genre: 'ambient',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="activity" className="block text-sm font-medium text-gray-700">
          What are you working on?
        </label>
        <input
          type="text"
          id="activity"
          value={preferences.activity}
          onChange={(e) => setPreferences({ ...preferences, activity: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="e.g., coding a website"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700">
            Mood
          </label>
          <select
            id="mood"
            value={preferences.mood}
            onChange={(e) => setPreferences({ ...preferences, mood: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="focused">Focused</option>
            <option value="calm">Calm</option>
            <option value="energetic">Energetic</option>
            <option value="relaxed">Relaxed</option>
          </select>
        </div>

        <div>
          <label htmlFor="tempo" className="block text-sm font-medium text-gray-700">
            Tempo
          </label>
          <select
            id="tempo"
            value={preferences.tempo}
            onChange={(e) => setPreferences({ ...preferences, tempo: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="slow">Slow</option>
            <option value="moderate">Moderate</option>
            <option value="fast">Fast</option>
          </select>
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <select
            id="genre"
            value={preferences.genre}
            onChange={(e) => setPreferences({ ...preferences, genre: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="ambient">Ambient</option>
            <option value="electronic">Electronic</option>
            <option value="classical">Classical</option>
            <option value="lofi">Lo-Fi</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Generating...' : 'Generate Music'}
      </button>
    </form>
  );
}
