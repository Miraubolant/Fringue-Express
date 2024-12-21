import React from 'react';
import { DiscountTableHeader } from './DiscountTableHeader';
import { DiscountTableRow } from './DiscountTableRow';
import { RemiseItem, SortConfig } from '../../../types/remise';
import { CartActions } from './CartActions';

interface DiscountTableProps {
  items: RemiseItem[];
  sortConfig: SortConfig;
  onSort: (key: keyof RemiseItem) => void;
}

export const DiscountTable: React.FC<DiscountTableProps> = ({
  items,
  sortConfig,
  onSort
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
      {/* Actions du panier - Toujours visible */}
      <div className="px-6 py-4 border-b border-gray-700/50">
        <CartActions />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <DiscountTableHeader sortConfig={sortConfig} onSort={onSort} />
          <tbody className="divide-y divide-gray-700/50">
            {items.map((item, index) => (
              <DiscountTableRow 
                key={`${item.reference}-${index}`} 
                item={item} 
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};