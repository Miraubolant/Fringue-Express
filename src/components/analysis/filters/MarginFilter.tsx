import React from 'react';
import { Select } from '../../ui/Select';

interface MarginFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarginFilter({ value, onChange }: MarginFilterProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filtrer par marge"
    >
      <option value="">Marge</option>
      <option value="positive">Marge &gt; 0%</option>
      <option value="negative">Marge &lt; 0%</option>
      <option value="high">Marge &gt; 30%</option>
    </Select>
  );
}