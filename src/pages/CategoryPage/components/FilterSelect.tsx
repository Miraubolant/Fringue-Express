import React from 'react';
import { getStateLabel } from '../utils/excel/stateMapping';
import { normalizeColor } from '../utils/colorNormalizer';

interface FilterSelectProps {
  label: string;
  value: string | null;
  options: string[];
  onChange: (value: string | null) => void;
  type?: 'state' | 'color' | 'default';
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  options = [],
  onChange,
  type = 'default'
}) => {
  const getDisplayValue = (option: string) => {
    switch (type) {
      case 'state':
        return getStateLabel(option);
      case 'color':
        return option === 'Autre' ? 'Autre' : option;
      default:
        return option;
    }
  };

  return (
    <div className="relative group">
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="h-10 w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 
                   text-gray-200 focus:border-purple-500/50 focus:ring-2 
                   focus:ring-purple-500/20 transition-all duration-200
                   hover:bg-gray-700/50 hover:border-gray-600/50
                   appearance-none cursor-pointer
                   [&>option]:py-2 [&>option]:px-3
                   [&>option]:bg-gray-800 [&>option]:text-gray-200
                   [&>option:hover]:bg-gray-700 [&>option:hover]:text-white
                   scrollbar-thin scrollbar-track-gray-800 
                   scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500"
      >
        <option value="" className="py-2">{label}</option>
        {Array.from(new Set(options)).sort().map(option => (
          <option 
            key={option} 
            value={option} 
            className="py-2"
          >
            {getDisplayValue(option)}
          </option>
        ))}
      </select>

      {/* Icône de flèche personnalisée */}
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400 group-hover:text-gray-300">
        <svg className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <path d="M7 7l3 3 3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};