import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { RemiseItem, SortConfig } from '../../../types/remise';
import { useDiscountStore } from '../../../store/discountStore';

interface DiscountTableHeaderProps {
  sortConfig: SortConfig;
  onSort: (key: keyof RemiseItem) => void;
}

export const DiscountTableHeader: React.FC<DiscountTableHeaderProps> = ({
  sortConfig,
  onSort
}) => {
  const { discountPercentage } = useDiscountStore();

  const renderSortButton = (label: string, key: keyof RemiseItem, align: 'left' | 'right' = 'left') => {
    const isActive = sortConfig.key === key;
    
    return (
      <button
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg w-full
          transition-all duration-200
          ${isActive 
            ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
            : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}
          ${align === 'right' ? 'justify-end' : 'justify-start'}
        `}
        onClick={() => onSort(key)}
      >
        <span className="text-sm font-medium whitespace-nowrap">{label}</span>
        <ArrowUpDown className="w-4 h-4 flex-shrink-0" />
      </button>
    );
  };

  return (
    <thead>
      <tr className="border-b border-gray-700/50">
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 w-1/3">
          {renderSortButton('Article', 'title')}
        </th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
          {renderSortButton('Marque', 'brand')}
        </th>
        <th className="px-6 py-4 text-right text-sm font-medium text-gray-400 w-[180px]">
          <div className="flex items-center justify-end gap-2">
            {renderSortButton('Prix Arlettie', 'priceArlettie', 'right')}
            {discountPercentage && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-500/10 text-green-400 whitespace-nowrap">
                -{discountPercentage}%
              </span>
            )}
          </div>
        </th>
        <th className="px-6 py-4 text-right text-sm font-medium text-gray-400 w-[180px]">
          {renderSortButton('Prix Marque', 'priceBrand', 'right')}
        </th>
        <th className="px-6 py-4 text-right text-sm font-medium text-gray-400 w-[120px]">
          {renderSortButton('Marge', 'margin', 'right')}
        </th>
      </tr>
    </thead>
  );
};