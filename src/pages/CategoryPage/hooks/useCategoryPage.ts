import { useState, useCallback, useMemo, useEffect } from 'react';
import { CategoryItem, FilterState, SortConfig } from '../types';
import { parseDate } from '../utils/dateFilter';
import { getSourceFromItem } from '../utils/sourceDetector';
import { saveCategoryItems, getCategoryItems, deleteCategoryItem } from '../../../services/firebase/categoryItems';
import { parseCategoryExcel } from '../utils/excel/parseCategoryExcel';

export const useCategoryPage = () => {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'status',
    direction: 'descending'
  });
  
  const [filters, setFilters] = useState<FilterState>({
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

  // Load initial data
  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await getCategoryItems();
        setItems(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    loadItems();
  }, []);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.brand.toLowerCase().includes(searchTerm)
      );
    }

    // Source filter (Vinted/Vestiaire)
    if (filters.source) {
      result = result.filter(item => getSourceFromItem(item) === filters.source);
    }

    // Other filters
    if (filters.brand) {
      result = result.filter(item => item.brand === filters.brand);
    }
    if (filters.state) {
      result = result.filter(item => item.state === filters.state);
    }
    if (filters.material) {
      result = result.filter(item => item.material === filters.material);
    }
    if (filters.color) {
      result = result.filter(item => item.color === filters.color);
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      result = result.filter(item => {
        const itemDate = parseDate(item.status);
        if (!itemDate) return false;

        const startOk = !filters.dateRange.start || itemDate >= filters.dateRange.start.getTime();
        const endOk = !filters.dateRange.end || itemDate <= filters.dateRange.end.getTime();
        
        return startOk && endOk;
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortConfig.key === 'status') {
        const aDate = parseDate(a.status) || 0;
        const bDate = parseDate(b.status) || 0;
        return sortConfig.direction === 'ascending' ? aDate - bDate : bDate - aDate;
      }

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    return result;
  }, [items, filters, sortConfig]);

  // Filter options
  const filterOptions = useMemo(() => ({
    brands: [...new Set(items.map(item => item.brand))].sort(),
    states: [...new Set(items.map(item => item.state))].sort(),
    materials: [...new Set(items.map(item => item.material))].sort(),
    colors: [...new Set(items.map(item => item.color))].sort()
  }), [items]);

  return {
    items: filteredAndSortedItems,
    allItems: items,
    filterOptions,
    sortConfig,
    filters,
    error,
    isImporting,
    setFilters,
    handleSort: useCallback((key: keyof CategoryItem) => {
      setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'ascending'
          ? 'descending'
          : 'ascending'
      }));
    }, []),
    handleImport: useCallback(async (files: FileList) => {
      setIsImporting(true);
      setError(null);

      try {
        const importedItems = await parseCategoryExcel(files);
        await saveCategoryItems(importedItems);
        setItems(current => [...current, ...importedItems]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsImporting(false);
      }
    }, []),
    handleDelete: useCallback(async (id: string) => {
      try {
        await deleteCategoryItem(id);
        setItems(current => current.filter(item => item.id !== id));
      } catch (err) {
        setError((err as Error).message);
      }
    }, [])
  };
};