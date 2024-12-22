import React from 'react';
import { Search, Upload, X } from 'lucide-react';
import { FilterConfig } from '../types';
import { Input } from '../../../components/ui/Input';
import { DiscountInput } from '../../../components/ui/DiscountInput';
import { useDiscountStore } from '../../../store/discountStore';

interface DiscountFiltersProps {
  filters: FilterConfig;
  onFilterChange: (filters: FilterConfig) => void;
  availableBrands: string[];
  onImport: (file: File) => void;
  isImporting: boolean;
  totalItems: number;
  filteredItems: number;
}

export const DiscountFilters: React.FC<DiscountFiltersProps> = ({
  filters,
  onFilterChange,
  availableBrands,
  onImport,
  isImporting,
  totalItems,
  filteredItems
}) => {
  const { discountPercentage, setDiscountPercentage } = useDiscountStore();
  const hasActiveFilters = filters.search || filters.brand;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search and count */}
          <div className="flex flex-1 items-center gap-3 min-w-[300px]">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Rechercher par référence ou titre..."
                value={filters.search}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                className="pl-9 h-9 bg-gray-800/50 border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              />
              {filters.search && (
                <button
                  onClick={() => onFilterChange({ ...filters, search: '' })}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  <X className="h-4 h-4" />
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

          {/* Filters and actions */}
          <div className="flex items-center gap-3">
            {availableBrands.length > 0 && (
              <div className="relative group">
                <select
                  value={filters.brand || ''}
                  onChange={(e) => onFilterChange({ ...filters, brand: e.target.value || null })}
                  className="h-9 w-[200px] appearance-none
                           bg-gray-700/50 border border-gray-600/50 
                           rounded-lg px-3 pr-8
                           text-sm text-gray-200 
                           focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                           hover:bg-gray-600/50 hover:border-gray-500/50
                           transition-all duration-200
                           cursor-pointer"
                >
                  <option value="" className="bg-gray-800 text-gray-300">Toutes les marques</option>
                  {availableBrands.map(brand => (
                    <option 
                      key={brand} 
                      value={brand}
                      className="bg-gray-800 text-gray-200 py-1"
                    >
                      {brand}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400 group-hover:text-gray-300">
                  <svg className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path d="M7 7l3 3 3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            )}

            <DiscountInput
              value={discountPercentage}
              onChange={setDiscountPercentage}
              className="w-[160px]"
            />

            <button
              className={`
                relative overflow-hidden flex items-center gap-2 px-3 py-1.5
                bg-blue-500/10 hover:bg-blue-500/20 
                text-blue-400 hover:text-blue-300
                rounded-lg border border-blue-500/20 hover:border-blue-500/30
                transition-all duration-200
                ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              disabled={isImporting}
            >
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])}
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
    </div>
  );
};