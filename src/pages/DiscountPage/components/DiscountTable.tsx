import React from 'react';
import { DiscountTableHeader } from './DiscountTableHeader';
import { DiscountTableRow } from './DiscountTableRow';
import { RemiseItem, SortConfig } from '../../../types/remise';
import { Pagination } from '../../../components/ui/Pagination';
import { usePagination } from '../../../hooks/usePagination';

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
  const {
    currentPage,
    totalPages,
    paginatedItems,
    setPage
  } = usePagination(items, { itemsPerPage: 50 });

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
      <div className="relative overflow-x-auto">
        <div className="min-w-[1040px]">
          <table className="w-full">
            <DiscountTableHeader sortConfig={sortConfig} onSort={onSort} />
            <tbody className="divide-y divide-gray-700/50">
              {paginatedItems.map((item, index) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};