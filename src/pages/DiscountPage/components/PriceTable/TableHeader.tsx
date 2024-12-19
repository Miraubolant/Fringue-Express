import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { PriceAnalysis, SortConfig } from '../../types';

interface TableHeaderProps {
  sortConfig: SortConfig;
  onSort: (key: keyof PriceAnalysis) => void;
  discountPercentage: number | null;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ 
  sortConfig, 
  onSort,
  discountPercentage 
}) => {
  const getSortIcon = (key: keyof PriceAnalysis) => {
    if (sortConfig.key === key) {
      return (
        <span className={`transition-transform duration-200 ${
          sortConfig.direction === 'ascending' ? 'rotate-0' : 'rotate-180'
        }`}>
          ↑
        </span>
      );
    }
    return <ArrowUpDown className="h-4 w-4" />;
  };

  return (
    <tr className="border-b border-gray-700/50">
      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
        <button
          className="flex items-center gap-2 hover:text-white"
          onClick={() => onSort('title')}
        >
          Article {getSortIcon('title')}
        </button>
      </th>
      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
        <button
          className="flex items-center gap-2 hover:text-white"
          onClick={() => onSort('brand')}
        >
          Marque {getSortIcon('brand')}
        </button>
      </th>
      <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
        <button
          className="flex items-center justify-end gap-2 hover:text-white ml-auto"
          onClick={() => onSort('priceArlettie')}
        >
          Prix Arlettie {discountPercentage ? `(-${discountPercentage}%)` : ''} {getSortIcon('priceArlettie')}
        </button>
      </th>
      <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
        <button
          className="flex items-center justify-end gap-2 hover:text-white ml-auto"
          onClick={() => onSort('priceBrand')}
        >
          Prix Marque {getSortIcon('priceBrand')}
        </button>
      </th>
      <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
        <button
          className="flex items-center justify-end gap-2 hover:text-white ml-auto"
          onClick={() => onSort('googleAverage')}
        >
          Moyenne Google {getSortIcon('googleAverage')}
        </button>
      </th>
      <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
        <button
          className="flex items-center justify-end gap-2 hover:text-white ml-auto"
          onClick={() => onSort('margin')}
        >
          Marge {getSortIcon('margin')}
        </button>
      </th>
    </tr>
  );
};