import React from 'react';
import { Filters } from './components/Filters';
import { PriceTable } from './components/PriceTable';
import { SelectionAnalysis } from '../../components/analysis/SelectionAnalysis';
import { useDiscountPage } from './hooks/useDiscountPage';

export const DiscountPage: React.FC = () => {
  const {
    items,
    sortConfig,
    filters,
    availableBrands,
    handleSort,
    handleAnalysisFileImport,
    setFilters,
    isLoading,
    error
  } = useDiscountPage();

  return (
    <div className="space-y-8 py-6 pb-32">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <Filters
        filters={filters}
        onFilterChange={setFilters}
        availableBrands={availableBrands}
        onImport={handleAnalysisFileImport}
        isLoading={isLoading}
      />

      <PriceTable
        items={items}
        sortConfig={sortConfig}
        onSort={handleSort}
        discountPercentage={filters.discountPercentage}
      />

      <SelectionAnalysis />
    </div>
  );
};