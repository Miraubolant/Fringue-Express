import React from 'react';
import { CategoryTableHeader } from './CategoryTableHeader';
import { CategoryTableRow } from './CategoryTableRow';
import { CategoryItem, SortConfig } from '../types';
import { Pagination } from '../../../components/ui/Pagination';
import { usePagination } from '../../../hooks/usePagination';

interface CategoryTableProps {
  items: CategoryItem[];
  sortConfig: SortConfig;
  onSort: (key: keyof CategoryItem) => void;
  onDelete: (id: string) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  items,
  sortConfig,
  onSort,
  onDelete
}) => {
  const {
    currentPage,
    totalPages,
    paginatedItems,
    setPage
  } = usePagination(items, { itemsPerPage: 50 });

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <CategoryTableHeader sortConfig={sortConfig} onSort={onSort} />
          <tbody className="divide-y divide-gray-700/50">
            {paginatedItems.map((item) => (
              <CategoryTableRow 
                key={item.id} 
                item={item} 
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
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