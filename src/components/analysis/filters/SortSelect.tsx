import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Select } from '../../ui/Select';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-navy-400 dark:text-navy-300" />
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Trier les résultats"
        className="min-w-[180px]"
      >
        <option value="margin-desc">Marge (décroissant)</option>
        <option value="margin-asc">Marge (croissant)</option>
        <option value="price-desc">Prix (décroissant)</option>
        <option value="price-asc">Prix (croissant)</option>
      </Select>
    </div>
  );
}