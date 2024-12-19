import React from 'react';
import { Search, Upload, X } from 'lucide-react';
import { FilterState } from '../types';
import { Input } from '../../../components/ui/Input';
import { FilterSelect } from '../../../components/category/FilterSelect';

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
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  filters,
  onFilterChange,
  options,
  onImport,
  isImporting
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 
                    backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 mb-4">
      <div className="flex flex-col gap-4">
        {/* Première ligne : Recherche et Import */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Rechercher un article..."
              value={filters.search || ''}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              className="pl-10 h-10 bg-gray-800/50 border-gray-700/50 
                        focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
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

          <button
            className={`
              relative overflow-hidden flex items-center gap-2 px-4 py-2 
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

        {/* Deuxième ligne : Filtres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          />
        </div>
      </div>
    </div>
  );
};