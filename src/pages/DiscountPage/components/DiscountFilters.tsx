import React from 'react';
import { Search, Upload, X } from 'lucide-react';
import { FilterConfig } from '../types';
import { Input } from '../../../components/ui/Input';
import { DiscountInput } from '../../../components/ui/DiscountInput';
import { useDiscountStore } from '../../../store/discountStore';
import { CartSelector } from '../../../components/cart/CartSelector';

interface DiscountFiltersProps {
  filters: FilterConfig;
  onFilterChange: (filters: FilterConfig) => void;
  availableBrands: string[];
  onImport: (file: File) => void;
  isImporting: boolean;
}

export const DiscountFilters: React.FC<DiscountFiltersProps> = ({
  filters,
  onFilterChange,
  availableBrands,
  onImport,
  isImporting
}) => {
  const { discountPercentage, setDiscountPercentage } = useDiscountStore();

  return (
    <div className="p-4 border-b border-gray-700/50">
      <div className="flex flex-col gap-4">
        {/* Recherche, Réduction et Import */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Rechercher par référence ou titre..."
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              className="pl-10 h-10 bg-gray-800/50 border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
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

          <DiscountInput
            value={discountPercentage}
            onChange={setDiscountPercentage}
            className="w-[160px]"
          />

          <CartSelector />

          <div className="relative">
            <button
              className={`
                flex items-center gap-2 px-4 py-2 h-10
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

        {/* Filtre par marque */}
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.brand || ''}
            onChange={(e) => onFilterChange({ ...filters, brand: e.target.value || null })}
            className="h-10 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 text-gray-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          >
            <option value="">Toutes les marques</option>
            {availableBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};