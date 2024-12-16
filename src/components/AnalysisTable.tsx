import React, { useState, useMemo } from 'react';
import { TableHeader } from './analysis/table/TableHeader';
import { TableRow } from './analysis/table/TableRow';
import { Card } from './ui/Card';
import { AnalysisResult, CartItem } from '../types';
import { sortResults } from '../utils/sort';
import { filterResults } from '../utils/filters';

interface AnalysisTableProps {
  results: AnalysisResult[];
  arlettieDiscount: number;
  filters: {
    price: string;
    sort: string;
    search: string;
  };
  onAddToCart: (item: CartItem) => void;
  onRemoveFromCart: (reference: string) => void;
  cartItems: CartItem[];
}

export function AnalysisTable({ 
  results, 
  arlettieDiscount, 
  filters,
  onAddToCart,
  onRemoveFromCart,
  cartItems 
}: AnalysisTableProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [sortField, setSortField] = useState('margin');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedResults = useMemo(() => {
    let filtered = filterResults(results, filters, arlettieDiscount);
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(result => 
        result.item.reference.toLowerCase().includes(searchLower) ||
        result.item.title.toLowerCase().includes(searchLower)
      );
    }
    
    return sortResults(filtered, sortField, sortDirection);
  }, [results, filters, arlettieDiscount, sortField, sortDirection]);

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader 
            arlettieDiscount={arlettieDiscount}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <tbody className="divide-y divide-navy-100 dark:divide-navy-800">
            {filteredAndSortedResults.map((result) => (
              <TableRow
                key={result.item.reference}
                result={result}
                isExpanded={expandedItem === result.item.reference}
                arlettieDiscount={arlettieDiscount}
                onToggleExpand={setExpandedItem}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                isInCart={cartItems.some(item => item.reference === result.item.reference)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}