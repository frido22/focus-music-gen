import FormSelect from './FormSelect';

const MOOD_OPTIONS = [
  { value: 'focused', label: 'Focused' },
  { value: 'calm', label: 'Calm' },
  { value: 'energetic', label: 'Energetic' },
  { value: 'relaxed', label: 'Relaxed' },
];

const TEMPO_OPTIONS = [
  { value: 'moderate', label: 'Moderate' },
  { value: 'slow', label: 'Slow' },
  { value: 'fast', label: 'Fast' },
];

const GENRE_OPTIONS = [
  { value: 'ambient', label: 'Ambient' },
  { value: 'classical', label: 'Classical' },
  { value: 'electronic', label: 'Electronic' },
  { value: 'lo-fi', label: 'Lo-Fi' },
];

const DURATION_OPTIONS = [
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: '90', label: '1.5 hours' },
  { value: '120', label: '2 hours' },
];

interface PreferenceSelectsProps {
  mood: string;
  setMood: (value: string) => void;
  tempo: string;
  setTempo: (value: string) => void;
  genre: string;
  setGenre: (value: string) => void;
  duration: '30' | '60' | '90' | '120';
  setDuration: (value: '30' | '60' | '90' | '120') => void;
}

export default function PreferenceSelects({
  mood,
  setMood,
  tempo,
  setTempo,
  genre,
  setGenre,
  duration,
  setDuration,
}: PreferenceSelectsProps) {
  const handleDurationChange = (value: string) => {
    setDuration(value as '30' | '60' | '90' | '120');
  };

  return (
    <div className="flex flex-wrap gap-4 overflow-visible">
      <div className="flex-1 min-w-[200px] overflow-visible">
        <FormSelect id="mood" label="Mood" value={mood} onChange={setMood} options={MOOD_OPTIONS} />
      </div>
      <div className="flex-1 min-w-[200px] overflow-visible">
        <FormSelect id="tempo" label="Tempo" value={tempo} onChange={setTempo} options={TEMPO_OPTIONS} />
      </div>
      <div className="flex-1 min-w-[200px] overflow-visible">
        <FormSelect id="genre" label="Genre" value={genre} onChange={setGenre} options={GENRE_OPTIONS} />
      </div>
      <div className="flex-1 min-w-[200px] overflow-visible">
        <FormSelect
          id="duration"
          label="Focus Time"
          value={duration}
          onChange={handleDurationChange}
          options={DURATION_OPTIONS}
        />
      </div>
    </div>
  );
}
