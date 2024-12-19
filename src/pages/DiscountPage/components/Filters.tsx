import React from 'react';
import { Search, X, RefreshCw } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { DiscountInput } from '../../../components/ui/DiscountInput';
import { FilterConfig } from '../types';
import { useDiscountStore } from '../../../store/discountStore';

interface FiltersProps {
  filters: FilterConfig;
  onFilterChange: (filters: FilterConfig) => void;
  availableBrands: string[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Filters: React.FC<FiltersProps> = ({ 
  filters, 
  onFilterChange,
  availableBrands,
  onRefresh,
  isRefreshing
}) => {
  const { setDiscountPercentage } = useDiscountStore();

  const handleDiscountChange = (value: number | null) => {
    setDiscountPercentage(value);
    onFilterChange({
      ...filters,
      discountPercentage: value
    });
  };

  return (
    <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Recherche */}
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

        <div className="flex items-center gap-4">
          {/* Filtre par marque */}
          {availableBrands.length > 0 && (
            <select
              value={filters.brand || ''}
              onChange={(e) => onFilterChange({ 
                ...filters, 
                brand: e.target.value || null 
              })}
              className="h-10 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 text-gray-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            >
              <option value="">Toutes les marques</option>
              {availableBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          )}

          {/* Réduction */}
          <DiscountInput
            value={filters.discountPercentage}
            onChange={handleDiscountChange}
            className="w-[160px]" // Augmentation de la largeur
          />

          {/* Bouton de rafraîchissement */}
          <Button
            variant="ghost"
            onClick={onRefresh}
            disabled={isRefreshing}
            icon={RefreshCw}
            className={`h-10 ${isRefreshing ? 'animate-spin' : ''}`}
          >
            Actualiser
          </Button>
        </div>
      </div>
    </div>
  );
};