import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { CategoryItem, SortConfig } from '../types';

interface CategoryTableHeaderProps {
  sortConfig: SortConfig;
  onSort: (key: keyof CategoryItem) => void;
}

export const CategoryTableHeader: React.FC<CategoryTableHeaderProps> = ({
  sortConfig,
  onSort
}) => {
  const renderSortButton = (label: string, key: keyof CategoryItem) => (
    <button
      className="flex items-center gap-2 hover:text-white"
      onClick={() => onSort(key)}
    >
      {label}
      <ArrowUpDown className={`w-4 h-4 ${
        sortConfig.key === key ? 'text-purple-400' : 'text-gray-400'
      }`} />
    </button>
  );

  return (
    <thead>
      <tr className="border-b border-gray-700/50">
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
          {renderSortButton('Article', 'title')}
        </th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
          {renderSortButton('Marque', 'brand')}
        </th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
          {renderSortButton('État', 'state')}
        </th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
          {renderSortButton('Matière', 'material')}
        </th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
          {renderSortButton('Couleur', 'color')}
        </th>
        <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
          {renderSortButton('Prix', 'price')}
        </th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
          {renderSortButton('Date', 'status')}
        </th>
        <th className="px-6 py-4 text-center text-sm font-medium text-gray-400">
          Liens
        </th>
      </tr>
    </thead>
  );
};