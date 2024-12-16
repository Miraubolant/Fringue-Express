import React from 'react';
import { Percent } from 'lucide-react';

interface DiscountInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function DiscountInput({ value, onChange }: DiscountInputProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-navy-50 dark:bg-navy-800/50 px-3 py-2 rounded-lg">
        <Percent className="h-4 w-4 text-navy-500 dark:text-navy-400" />
        <input
          type="number"
          min="0"
          max="100"
          value={value || ''}
          placeholder="0"
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-16 bg-transparent border-none p-0 text-sm text-navy-700 dark:text-navy-200
                   focus:ring-0 focus:outline-none"
          aria-label="Pourcentage de réduction Arlettie"
        />
        <span className="text-sm text-navy-500 dark:text-navy-400">%</span>
      </div>
    </div>
  );
}