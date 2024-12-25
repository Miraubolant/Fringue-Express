import React from 'react';
import { Search, X, Tag as TagIcon } from 'lucide-react';
import { FilterState } from '../types';
import { FilterTags } from './FilterTags';

interface DataTableFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  brands: string[];
}

export const DataTableFilters: React.FC<DataTableFiltersProps> = ({
  filters,
  onFilterChange,
  brands
}) => {
  const handleAddTag = (type: 'brand' | 'source', value: string) => {
    onFilterChange({
      ...filters,
      [type]: [...(filters[type] || []), value]
    });
  };

  const handleRemoveTag = (type: 'brand' | 'source', value: string) => {
    onFilterChange({
      ...filters,
      [type]: (filters[type] || []).filter(v => v !== value)
    });
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Recherche */}
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              placeholder="Rechercher par titre ou référence..."
              className="w-full h-10 pl-10 pr-10 bg-gray-700/50 border border-gray-600/50 rounded-lg
                       text-white placeholder-gray-400
                       focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
            />
            {filters.search && (
              <button
                onClick={() => onFilterChange({ ...filters, search: '' })}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Source Selector */}
        <div className="relative group">
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) handleAddTag('source', e.target.value);
            }}
            className="h-10 bg-gray-700/50 border border-gray-600/50 rounded-lg px-3
                     text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                     appearance-none cursor-pointer pr-8"
          >
            <option value="">Ajouter une source</option>
            <option value="arlettie">Arlettie</option>
            <option value="vinted">Vinted</option>
            <option value="vestiaire">Vestiaire Collectif</option>
          </select>
          <TagIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Brand Selector */}
        <div className="relative group">
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) handleAddTag('brand', e.target.value);
            }}
            className="h-10 bg-gray-700/50 border border-gray-600/50 rounded-lg px-3
                     text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                     appearance-none cursor-pointer pr-8"
          >
            <option value="">Ajouter une marque</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <TagIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Tags */}
      <FilterTags
        sourceTags={filters.source || []}
        brandTags={filters.brand || []}
        onRemoveSource={(value) => handleRemoveTag('source', value)}
        onRemoveBrand={(value) => handleRemoveTag('brand', value)}
      />
    </div>
  );
};