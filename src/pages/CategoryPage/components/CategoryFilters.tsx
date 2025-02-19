import React from 'react';
import { Search, Upload, X, RefreshCw } from 'lucide-react';
import { FilterState } from '../types';
import { Input } from '../../../components/ui/Input';
import { FilterSelect } from '../../../components/ui/FilterSelect';
import { DateRangePicker } from '../../../components/ui/DateRangePicker';

interface CategoryFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  options: {
    brands: string[];
    states: string[];
    materials: string[];
    colors: string[];
  };
  onImport: (files: FileList) => void;
  isImporting: boolean;
  totalItems: number;
  filteredItems: number;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  filters,
  onFilterChange,
  options,
  onImport,
  isImporting,
  totalItems,
  filteredItems
}) => {
  const handleResetFilters = () => {
    onFilterChange({
      search: null,
      brand: null,
      state: null,
      material: null,
      color: null,
      dateRange: {
        start: null,
        end: null
      },
      source: null
    });
  };

  const hasActiveFilters = filters.search || 
    filters.brand || 
    filters.state || 
    filters.material || 
    filters.color || 
    filters.dateRange.start || 
    filters.dateRange.end || 
    filters.source;

  return (
    <div className="max-w-[1400px] mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
      {/* Top bar with search, counts and actions */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex flex-wrap items-center gap-3">
          {/* Left side: Search and counts */}
          <div className="flex flex-1 items-center gap-3 min-w-[300px]">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={filters.search || ''}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                className="pl-9 h-9 bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
              />
              {filters.search && (
                <button
                  onClick={() => onFilterChange({ ...filters, search: null })}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700/30 border border-gray-600/30">
              <span className="text-sm text-gray-400">
                {filteredItems} résultat{filteredItems > 1 ? 's' : ''} 
                {hasActiveFilters && ` sur ${totalItems}`}
              </span>
            </div>
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleResetFilters}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg
                transition-all duration-200
                ${hasActiveFilters 
                  ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/30'
                  : 'bg-gray-700/30 text-gray-400 border border-gray-600/30 cursor-not-allowed opacity-50'
                }
              `}
              disabled={!hasActiveFilters}
              title={hasActiveFilters ? "Réinitialiser tous les filtres" : "Aucun filtre actif"}
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Réinitialiser</span>
            </button>

            <button
              className={`
                relative overflow-hidden flex items-center gap-2 px-3 py-1.5
                bg-purple-500/10 hover:bg-purple-500/20 
                text-purple-400 hover:text-purple-300
                rounded-lg border border-purple-500/20 hover:border-purple-500/30
                transition-all duration-200
                ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              disabled={isImporting}
            >
              <input
                type="file"
                accept=".xlsx,.xls"
                multiple
                onChange={(e) => {
                  if (e.target.files?.length) {
                    onImport(e.target.files);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isImporting}
              />
              <Upload className={`w-4 h-4 ${isImporting ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">
                {isImporting ? 'Importation...' : 'Importer Excel'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Source filters */}
      <div className="px-4 pt-4 flex items-center gap-2">
        <button
          onClick={() => onFilterChange({ 
            ...filters, 
            source: filters.source === 'vinted' ? null : 'vinted'
          })}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg
            transition-all duration-200
            ${filters.source === 'vinted'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20'
            }
          `}
        >
          <span className="text-sm">Vinted</span>
        </button>

        <button
          onClick={() => onFilterChange({ 
            ...filters, 
            source: filters.source === 'vestiaire' ? null : 'vestiaire'
          })}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg
            transition-all duration-200
            ${filters.source === 'vestiaire'
              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
              : 'bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20'
            }
          `}
        >
          <span className="text-sm">Vestiaire Collectif</span>
        </button>
      </div>

      {/* Main filters */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <FilterSelect
            label="Marque"
            value={filters.brand}
            options={options.brands}
            onChange={(value) => onFilterChange({ ...filters, brand: value })}
          />
          <FilterSelect
            label="État"
            value={filters.state}
            options={options.states}
            onChange={(value) => onFilterChange({ ...filters, state: value })}
            type="state"
          />
          <FilterSelect
            label="Matière"
            value={filters.material}
            options={options.materials}
            onChange={(value) => onFilterChange({ ...filters, material: value })}
          />
          <FilterSelect
            label="Couleur"
            value={filters.color}
            options={options.colors}
            onChange={(value) => onFilterChange({ ...filters, color: value })}
            type="color"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-400">Période :</span>
          <DateRangePicker
            value={filters.dateRange}
            onChange={(dateRange) => onFilterChange({ ...filters, dateRange })}
          />
        </div>
      </div>
    </div>
  );
};