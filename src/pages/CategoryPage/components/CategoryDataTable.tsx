import React from 'react';
import { CategoryFilters } from './CategoryFilters';
import { CategoryTable } from './CategoryTable';
import { CategoryItem, FilterState, SortConfig } from '../types';

interface CategoryDataTableProps {
  items: CategoryItem[];
  filters: FilterState;
  sortConfig: SortConfig;
  filterOptions: {
    brands: string[];
    states: string[];
    materials: string[];
    colors: string[];
  };
  onFilterChange: (filters: FilterState) => void;
  onSort: (key: keyof CategoryItem) => void;
  onDelete: (id: string) => void;
  onImport: (files: FileList) => void;
  isImporting: boolean;
  totalItems: number;
  filteredItems: number;
}

export const CategoryDataTable: React.FC<CategoryDataTableProps> = ({
  items,
  filters,
  sortConfig,
  filterOptions,
  onFilterChange,
  onSort,
  onDelete,
  onImport,
  isImporting,
  totalItems,
  filteredItems
}) => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="space-y-4">
        <CategoryFilters
          filters={filters}
          onFilterChange={onFilterChange}
          options={filterOptions}
          onImport={onImport}
          isImporting={isImporting}
          totalItems={totalItems}
          filteredItems={filteredItems}
        />

        <CategoryTable
          items={items}
          sortConfig={sortConfig}
          onSort={onSort}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};