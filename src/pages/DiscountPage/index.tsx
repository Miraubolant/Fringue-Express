import React from 'react';
import { Upload, Percent } from 'lucide-react';
import { Button } from '../../components/ui/Button';
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
    error,
    refresh,
    isRefreshing
  } = useDiscountPage();

  return (
    <div className="space-y-8 py-6 pb-32">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center bg-blue-500/10 rounded-xl mb-2">
          <Percent className="w-8 h-8 text-blue-400" />
        </div>
        <Button
          variant="primary"
          icon={Upload}
          className="relative overflow-hidden"
          disabled={isLoading}
        >
          <input
            type="file"
            accept=".xlsx,.xls"
            multiple
            onChange={(e) => {
              if (e.target.files?.length) {
                handleAnalysisFileImport(e.target.files);
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={isLoading}
          />
          {isLoading ? 'Importation...' : 'Importer Excel'}
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <Filters
        filters={filters}
        onFilterChange={setFilters}
        availableBrands={availableBrands}
        onRefresh={refresh}
        isRefreshing={isRefreshing}
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