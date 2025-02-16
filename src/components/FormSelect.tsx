interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export default function FormSelect({ id, label, value, onChange, options }: FormSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white cursor-pointer"
          size={1}
          onMouseDown={(e) => {
            if (e.currentTarget.size === 1) {
              e.preventDefault();
              e.currentTarget.size = options.length;
            }
          }}
          onBlur={(e) => e.currentTarget.size = 1}
          onFocus={(e) => e.currentTarget.size = options.length}
          onMouseLeave={(e) => e.currentTarget.size = 1}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="px-4 py-2 hover:bg-indigo-50">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
