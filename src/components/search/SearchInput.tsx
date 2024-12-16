import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400 dark:text-navy-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher..."
        className="pl-10 pr-10 py-2 w-full rounded-lg text-sm
                 bg-navy-50 dark:bg-navy-800/50 border-none
                 text-navy-700 dark:text-navy-200
                 placeholder-navy-400 dark:placeholder-navy-500
                 focus:ring-2 focus:ring-navy-500/20 dark:focus:ring-navy-400/20"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2
                   text-navy-400 dark:text-navy-500 hover:text-navy-600 dark:hover:text-navy-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}