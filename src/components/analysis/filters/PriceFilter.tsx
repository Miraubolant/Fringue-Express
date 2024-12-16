import React from 'react';
import { Select } from '../../ui/Select';

interface PriceFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function PriceFilter({ value, onChange }: PriceFilterProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filtrer par prix"
    >
      <option value="">Tous les prix</option>
      <option value="0-50">0€ - 50€</option>
      <option value="50-100">50€ - 100€</option>
      <option value="100+">100€ +</option>
    </Select>
  );
}