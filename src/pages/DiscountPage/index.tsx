import React from 'react';
import { DiscountTable } from './components/DiscountTable';
import { DiscountFilters } from './components/DiscountFilters';
import { CartAnalysis } from '../../components/cart/CartAnalysis';
import { useDiscountPage } from './hooks/useDiscountPage';

export const DiscountPage: React.FC = () => {
  const {
    items,
    allItems,
    sortConfig,
    filters,
    availableBrands,
    handleSort,
    handleImport,
    setFilters,
    isImporting,
    error
  } = useDiscountPage();

  return (
    <div className="pt-24 pb-32">
      <div className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
          <DiscountFilters
            filters={filters}
            onFilterChange={setFilters}
            availableBrands={availableBrands}
            onImport={handleImport}
            isImporting={isImporting}
            totalItems={allItems.length}
            filteredItems={items.length}
          />

          <DiscountTable
            items={items}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
      </div>

      <CartAnalysis />
    </div>
  );
};