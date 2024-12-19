import React from 'react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { DiscountItem, SortConfig } from '../types';

interface DiscountTableProps {
  items: DiscountItem[];
  sortConfig: SortConfig;
  onSort: (key: keyof DiscountItem) => void;
}

export const DiscountTable: React.FC<DiscountTableProps> = ({
  items,
  sortConfig,
  onSort,
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <TableHeader sortConfig={sortConfig} onSort={onSort} />
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {items.map((item) => (
              <TableRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};