import React, { useState } from 'react';
import { Percent } from 'lucide-react';

interface DiscountInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  className?: string;
}

export const DiscountInput: React.FC<DiscountInputProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative group ${className}`}>
      <div className={`
        absolute inset-y-0 left-0 pl-3 flex items-center
        pointer-events-none transition-colors duration-200
        ${isFocused ? 'text-blue-400' : 'text-gray-400'}
      `}>
        <Percent className="h-4 w-4" />
      </div>
      
      <input
        type="number"
        min="0"
        max="100"
        value={value || ''}
        onChange={(e) => {
          const val = e.target.value === '' ? null : Math.max(0, Math.min(100, Number(e.target.value)));
          onChange(val);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full h-10 pl-10 pr-12
          bg-gray-800/50 hover:bg-gray-800/70
          border border-gray-700/50
          ${isFocused ? 'border-blue-500/50 ring-2 ring-blue-500/20' : 'hover:border-gray-600/50'}
          rounded-lg
          text-white placeholder-gray-400
          transition-all duration-200
          focus:outline-none
          text-sm
        `}
      />

      {value !== null && (
        <button
          onClick={() => onChange(null)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <span className="
            text-xs font-medium px-1.5 py-0.5 rounded-full
            bg-blue-500/10 text-blue-400
            hover:bg-blue-500/20
            transition-colors duration-200
          ">
            {value}%
          </span>
        </button>
      )}
    </div>
  );
};