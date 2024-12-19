import React from 'react';
import { getStateLabel } from '../../pages/CategoryPage/utils/excel/stateMapping';

interface FilterSelectProps {
  label: string;
  value: string | null;
  options: string[];
  onChange: (value: string | null) => void;
  type?: 'state' | 'default';
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  options,
  onChange,
  type = 'default'
}) => {
  const getDisplayValue = (option: string) => {
    if (type === 'state') {
      return getStateLabel(option);
    }
    return option;
  };

  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value || null)}
      className="h-10 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 
                 text-gray-200 focus:border-purple-500/50 focus:ring-2 
                 focus:ring-purple-500/20 transition-all duration-200
                 hover:bg-gray-700/50 hover:border-gray-600/50
                 scrollbar-thin scrollbar-track-gray-800/50 
                 scrollbar-thumb-gray-600/50 hover:scrollbar-thumb-gray-500/50"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(75, 85, 99, 0.5) rgba(31, 41, 55, 0.5)'
      }}
    >
      <option value="">{label}</option>
      {options.map(option => (
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