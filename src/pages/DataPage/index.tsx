import React from 'react';
import { useDataPage } from './hooks/useDataPage';
import { DataTable } from './components/DataTable';
import { ComparisonZone } from '../../components/comparison/ComparisonZone';
import { DataFilters } from './components/DataFilters';
import { SavedCartsSection } from '../../components/cart/SavedCartsSection';
import { FavoritesSection } from '../../components/favorites/FavoritesSection';

export const DataPage: React.FC = () => {
  const { 
    items, 
    currentPage, 
    totalPages,
    filters,
    availableBrands,
    setCurrentPage,
    setFilters,
    loading, 
    error,
    totalItems,
    filteredCount
  } = useDataPage();

  return (
    <div className="pt-24 pb-32 space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SavedCartsSection />
        <FavoritesSection />
      </div>

      <DataFilters
        filters={filters}
        onFilterChange={setFilters}
        brands={availableBrands}
        totalItems={totalItems}
        filteredItems={filteredCount}
      />

      <ComparisonZone />

      <DataTable 
        items={items}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};