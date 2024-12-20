import { useState, useEffect, useMemo, useCallback } from 'react';
import { CategoryItem, FilterState, SortConfig } from '../types';
import { parseCategoryExcel } from '../utils/excel/parseCategoryExcel';
import { saveCategoryItems, getCategoryItems, deleteCategoryItem } from '../../../services/firebase/categoryItems';
import { getAllMaterials } from '../utils/materialNormalizer';
import { getAllColors } from '../utils/colorNormalizer';

export const useCategoryPage = () => {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importStats, setImportStats] = useState<{ added: number; skipped: number; } | null>(null);
  
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'title',
    direction: 'ascending'
  });
  
  const [filters, setFilters] = useState<FilterState>({
    search: null,
    brand: null,
    state: null,
    material: null,
    color: null,
    status: null
  });

  // Charger les données initiales
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

  // Options de filtres
  const filterOptions = useMemo(() => ({
    brands: [...new Set(items.map(item => item.brand))].sort(),
    states: [...new Set(items.map(item => item.state))].sort(),
    materials: getAllMaterials(),
    colors: getAllColors(),
    statuses: [...new Set(items.map(item => item.status).filter(Boolean))].sort()
  }), [items]);

  // Filtrer et trier les éléments
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Appliquer les filtres
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.brand.toLowerCase().includes(searchTerm)
      );
    }

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

    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }

    // Appliquer le tri
    result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    return result;
  }, [items, filters, sortConfig]);

  return {
    items: filteredAndSortedItems,
    sortConfig,
    filters,
    filterOptions,
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
      setImportStats(null);

      try {
        const importedItems = await parseCategoryExcel(files);
        const stats = await saveCategoryItems(importedItems);
        setImportStats(stats);
        setItems(prevItems => [...prevItems, ...importedItems]);
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
    }, []),
    isImporting,
    error,
    importStats
  };
};