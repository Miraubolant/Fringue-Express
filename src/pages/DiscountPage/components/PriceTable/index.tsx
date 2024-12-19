import React from 'react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { PriceAnalysis, SortConfig } from '../../types';

interface PriceTableProps {
  items: PriceAnalysis[];
  sortConfig: SortConfig;
  onSort: (key: keyof PriceAnalysis) => void;
  discountPercentage: number | null;
}

export const PriceTable: React.FC<PriceTableProps> = ({
  items,
  sortConfig,
  onSort,
  discountPercentage
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <TableHeader 
              sortConfig={sortConfig} 
              onSort={onSort} 
              discountPercentage={discountPercentage}
            />
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {items.map((item) => (
              <TableRow 
                key={item.reference} 
                item={item} 
                discountPercentage={discountPercentage}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};