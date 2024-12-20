import { useState, useCallback, useMemo, useEffect } from 'react';
import { RemiseItem, SortConfig, FilterConfig } from '../../../types/remise';
import { parseDiscountExcel } from '../utils/excel/parseDiscountExcel';
import { saveRemiseItems, getRemiseItems } from '../../../services/firebase/remiseItems';
import { calculateMargin, calculateDiscountedPrice } from '../utils/calculations';
import { useDiscountStore } from '../../../store/discountStore';

export const useDiscountPage = () => {
  const [items, setItems] = useState<RemiseItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'reference',
    direction: 'ascending'
  });
  const [filters, setFilters] = useState<FilterConfig>({
    search: '',
    brand: null
  });

  const { discountPercentage } = useDiscountStore();

  // Charger les données au montage
  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await getRemiseItems();
        setItems(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    loadItems();
  }, []);

  const availableBrands = useMemo(() => {
    const brands = new Set(items.map(item => item.brand));
    return Array.from(brands).sort();
  }, [items]);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Appliquer les filtres
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(item => 
        item.reference.toLowerCase().includes(searchTerm) ||
        item.title.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.brand) {
      result = result.filter(item => item.brand === filters.brand);
    }

    // Calculer les marges pour le tri
    const itemsWithMargin = result.map(item => ({
      ...item,
      calculatedMargin: calculateMargin(
        item.priceBrand,
        calculateDiscountedPrice(item.priceArlettie, discountPercentage)
      )
    }));

    // Appliquer le tri
    itemsWithMargin.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Utiliser la marge calculée pour le tri si nécessaire
      if (sortConfig.key === 'margin') {
        aValue = a.calculatedMargin;
        bValue = b.calculatedMargin;
      }

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    // Retourner les items sans la marge calculée
    return itemsWithMargin.map(({ calculatedMargin, ...item }) => item);
  }, [items, filters, sortConfig, discountPercentage]);

  return {
    items: filteredAndSortedItems,
    sortConfig,
    filters,
    availableBrands,
    handleSort: useCallback((key: keyof RemiseItem) => {
      setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'ascending'
          ? 'descending'
          : 'ascending'
      }));
    }, []),
    handleImport: useCallback(async (file: File) => {
      setIsImporting(true);
      setError(null);

      try {
        const importedItems = await parseDiscountExcel(file);
        await saveRemiseItems(importedItems);
        setItems(prevItems => [...prevItems, ...importedItems]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsImporting(false);
      }
    }, []),
    setFilters,
    isImporting,
    error
  };
};