import { useState, useEffect, useMemo } from 'react';
import { CategoryItem, FilterState, SortConfig } from '../types';
import { parseCategoryExcel } from '../utils/excel/parseCategoryExcel';
import { saveCategoryItems, getCategoryItems, deleteCategoryItem } from '../../../services/firebase/categoryItems';

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
    color: null
  });

  // Charger les données initiales
  const loadItems = async () => {
    try {
      const data = await getCategoryItems();
      setItems(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Options de filtres disponibles
  const filterOptions = useMemo(() => {
    return {
      brands: [...new Set(items.map(item => item.brand))].sort(),
      states: [...new Set(items.map(item => item.state))].sort(),
      materials: [...new Set(items.map(item => item.material))].sort(),
      colors: [...new Set(items.map(item => item.color))].sort()
    };
  }, [items]);

  // Gérer la suppression
  const handleDelete = async (id: string) => {
    try {
      await deleteCategoryItem(id);
      await loadItems(); // Recharger la liste après la suppression
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Gérer l'import de fichiers
  const handleImport = async (files: FileList) => {
    setIsImporting(true);
    setError(null);
    setImportStats(null);

    try {
      let allItems: CategoryItem[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.name.match(/\.(xlsx|xls)$/i)) {
          throw new Error(`Le fichier "${file.name}" n'est pas un fichier Excel valide.`);
        }
        
        const items = await parseCategoryExcel(file);
        allItems = [...allItems, ...items];
      }

      if (allItems.length > 0) {
        const stats = await saveCategoryItems(allItems);
        setImportStats(stats);
        await loadItems();
      } else {
        throw new Error("Aucun article valide trouvé dans le(s) fichier(s).");
      }
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setIsImporting(false);
    }
  };

  // Gérer le tri
  const handleSort = (key: keyof CategoryItem) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };

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
    handleSort,
    handleImport,
    handleDelete,
    isImporting,
    error,
    importStats
  };
};