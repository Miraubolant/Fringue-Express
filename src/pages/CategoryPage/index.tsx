import React from 'react';
import { CategoryFilters } from './components/CategoryFilters';
import { CategoryTable } from './components/CategoryTable';
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
    <div className="space-y-4 pt-24 pb-32"> {/* Added pt-24 for top padding */}
      <div className="space-y-4">
        <CategoryFilters
          filters={filters}
          onFilterChange={setFilters}
          options={filterOptions}
          onImport={handleImport}
          isImporting={isImporting}
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {importStats && (
          <ImportFeedback error={null} stats={importStats} />
        )}

        <CategoryTable
          items={items}
          sortConfig={sortConfig}
          onSort={handleSort}
          onDelete={handleDelete}
        />
      </div>

      <SelectionAnalysis />
    </div>
  );
};