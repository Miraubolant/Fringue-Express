import React from 'react';
import { CategoryDataTable } from './components/CategoryDataTable';
import { ImportFeedback } from './components/ImportFeedback';
import { useCategoryPage } from './hooks/useCategoryPage';
import { SelectionAnalysis } from '../../components/analysis/SelectionAnalysis';

export const CategoryPage: React.FC = () => {
  const {
    items,
    sortConfig,
    filters,
    filterOptions,
    setFilters,
    handleSort,
    handleImport,
    handleDelete,
    isImporting,
    error,
    importStats
  } = useCategoryPage();

  return (
    <div className="space-y-4 pt-24 pb-32">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {importStats && (
        <ImportFeedback error={null} stats={importStats} />
      )}

      <CategoryDataTable
        items={items}
        filters={filters}
        sortConfig={sortConfig}
        filterOptions={filterOptions}
        onFilterChange={setFilters}
        onSort={handleSort}
        onDelete={handleDelete}
        onImport={handleImport}
        isImporting={isImporting}
      />

      <SelectionAnalysis />
    </div>
  );
};