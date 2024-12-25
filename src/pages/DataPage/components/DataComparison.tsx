import React, { useState, useMemo } from 'react';
import { ComparisonFilters } from './ComparisonFilters';
import { ComparisonTable } from './ComparisonTable';
import { ComparisonCart } from './ComparisonCart';
import { RemiseItem } from '../../../types/remise';
import { CategoryItem } from '../../CategoryPage/types';

interface DataComparisonProps {
  remiseItems: RemiseItem[];
  categoryItems: CategoryItem[];
  loading: boolean;
}

export const DataComparison: React.FC<DataComparisonProps> = ({
  remiseItems,
  categoryItems,
  loading
}) => {
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    priceRange: { min: null, max: null } as { min: number | null; max: number | null },
    source: null as 'vinted' | 'vestiaire' | null,
    sortBy: 'date' as 'date' | 'price' | 'brand',
    sortOrder: 'desc' as 'asc' | 'desc'
  });

  // Filter and sort items using useMemo
  const filteredData = useMemo(() => {
    const filterItems = <T extends RemiseItem | CategoryItem>(items: T[]) => {
      return items.filter(item => {
        // Search filter
        const searchMatch = filters.search
          ? item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            (('reference' in item) ? item.reference.toLowerCase().includes(filters.search.toLowerCase()) : false)
          : true;

        // Brand filter
        const brandMatch = filters.brand
          ? item.brand.toLowerCase() === filters.brand.toLowerCase()
          : true;

        // Price filter
        const price = 'priceArlettie' in item ? item.priceArlettie : item.price;
        const priceMatch = (
          (!filters.priceRange.min || price >= filters.priceRange.min) &&
          (!filters.priceRange.max || price <= filters.priceRange.max)
        );

        return searchMatch && brandMatch && priceMatch;
      });
    };

    // Sort function
    const sortItems = <T extends RemiseItem | CategoryItem>(items: T[]) => {
      return [...items].sort((a, b) => {
        const order = filters.sortOrder === 'asc' ? 1 : -1;
        
        switch (filters.sortBy) {
          case 'price':
            const priceA = 'priceArlettie' in a ? a.priceArlettie : a.price;
            const priceB = 'priceArlettie' in b ? b.priceArlettie : b.price;
            return (priceA - priceB) * order;
          case 'brand':
            return a.brand.localeCompare(b.brand) * order;
          case 'date':
          default:
            const dateA = 'createdAt' in a ? a.createdAt : 0;
            const dateB = 'createdAt' in b ? b.createdAt : 0;
            return (dateA - dateB) * order;
        }
      });
    };

    return {
      remiseItems: sortItems(filterItems(remiseItems)),
      categoryItems: sortItems(filterItems(categoryItems))
    };
  }, [remiseItems, categoryItems, filters]);

  return (
    <div className="space-y-6 pb-32">
      <ComparisonFilters
        filters={filters}
        onFilterChange={setFilters}
        brands={[...new Set([...remiseItems, ...categoryItems].map(item => item.brand))]}
      />

      <ComparisonTable
        remiseItems={filteredData.remiseItems}
        categoryItems={filteredData.categoryItems}
        loading={loading}
      />

      <ComparisonCart />
    </div>
  );
};