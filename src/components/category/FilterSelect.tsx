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
  options = [], // Valeur par défaut pour éviter l'erreur
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
                 hover:bg-gray-700/50 hover:border-gray-600/50"
    >
      <option value="">{label}</option>
      {Array.isArray(options) && options.map(option => (
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