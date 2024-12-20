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
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value || null)}
      className="h-10 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 
                 text-gray-200 focus:border-purple-500/50 focus:ring-2 
                 focus:ring-purple-500/20 transition-all duration-200
                 hover:bg-gray-700/50 hover:border-gray-600/50"
    >
      <option value="">{label}</option>
      {Array.from(new Set(options)).sort().map(option => (
        <option 
          key={option} 
          value={option} 
          className="bg-gray-800 text-gray-200 py-2"
        >
          {getDisplayValue(option)}
        </option>
      ))}
    </select>
  );
};