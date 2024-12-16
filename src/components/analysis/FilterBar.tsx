import React from 'react';
import { Filter, ShoppingCart } from 'lucide-react';
import { Card } from '../ui/Card';
import { PriceFilter } from './filters/PriceFilter';
import { DiscountInput } from './filters/DiscountInput';
import { SortSelect } from './filters/SortSelect';
import { SearchInput } from '../search/SearchInput';
import { CartButton } from '../cart/CartButton';

interface FilterBarProps {
  onFilterChange: (type: string, value: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
  arlettieDiscount: number;
  onDiscountChange: (discount: number) => void;
  cartItemCount: number;
  onCartClick: () => void;
  filters: {
    price: string;
    sort: string;
    search: string;
  };
}

export function FilterBar({ 
  onFilterChange, 
  onSortChange,
  onSearchChange,
  arlettieDiscount, 
  onDiscountChange,
  cartItemCount,
  onCartClick,
  filters
}: FilterBarProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center flex-1 min-w-[200px]">
          <SearchInput 
            value={filters.search}
            onChange={onSearchChange}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <PriceFilter 
            value={filters.price}
            onChange={(value) => onFilterChange('price', value)} 
          />
          <DiscountInput 
            value={arlettieDiscount} 
            onChange={onDiscountChange} 
          />
          <div className="h-6 w-px bg-navy-200 dark:bg-navy-700" />
          <SortSelect 
            value={filters.sort}
            onChange={onSortChange} 
          />
          <div className="h-6 w-px bg-navy-200 dark:bg-navy-700" />
          <CartButton
            itemCount={cartItemCount}
            onClick={onCartClick}
          />
        </div>
      </div>
    </Card>
  );
}