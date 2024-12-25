import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';

interface ComparisonFiltersProps {
  filters: {
    search: string;
    brand: string;
    source: 'arlettie' | 'vinted' | 'vestiaire' | null;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
  onFilterChange: (filters: any) => void;
  brands: string[];
}

export const ComparisonFilters: React.FC<ComparisonFiltersProps> = ({
  filters,
  onFilterChange,
  brands
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
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

        {/* Source */}
        <div className="w-[200px]">
          <select
            value={filters.source || ''}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              source: e.target.value ? e.target.value as typeof filters.source : null 
            })}
            className="w-full h-10 bg-gray-700/50 border border-gray-600/50 rounded-lg px-3
                     text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">Toutes les sources</option>
            <option value="arlettie">Arlettie</option>
            <option value="vinted">Vinted</option>
            <option value="vestiaire">Vestiaire Collectif</option>
          </select>
        </div>

        {/* Marque */}
        <div className="w-[200px]">
          <select
            value={filters.brand}
            onChange={(e) => onFilterChange({ ...filters, brand: e.target.value })}
            className="w-full h-10 bg-gray-700/50 border border-gray-600/50 rounded-lg px-3
                     text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">Toutes les marques</option>
            {brands.sort().map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Tri */}
        <div className="flex items-center gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
            className="h-10 bg-gray-700/50 border border-gray-600/50 rounded-lg px-3
                     text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="date">Date</option>
            <option value="price">Prix</option>
            <option value="brand">Marque</option>
          </select>

          <button
            onClick={() => onFilterChange({ 
              ...filters, 
              sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
            })}
            className="p-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-gray-400 hover:text-white"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};