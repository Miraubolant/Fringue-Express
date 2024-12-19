import { useState, useCallback, useMemo } from 'react';
import { PriceAnalysis, SortConfig, FilterConfig } from '../types';
import { parsePriceAnalysis, parsePriceLinks } from '../utils/parseExcelData';
import { calculateMargin } from '../utils/calculations';
import { savePriceAnalysis } from '../../../services/firebase/priceAnalysis';
import { savePriceLinks } from '../../../services/firebase/priceLinks';
import { useFirebaseData } from '../../../hooks/useFirebaseData';

export const useDiscountPage = () => {
  const { 
    data: firebaseData, 
    loading: isLoadingData, 
    error: firebaseError,
    refresh,
    isRefreshing 
  } = useFirebaseData();
  
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importStats, setImportStats] = useState<{
    analysis: { added: number; skipped: number; };
    links: { added: number; skipped: number; };
  } | null>(null);
  
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'margin',
    direction: 'descending',
  });
  
  const [filters, setFilters] = useState<FilterConfig>({
    search: '',
    discountPercentage: null,
    brand: null
  });

  const availableBrands = useMemo(() => {
    const brands = new Set(firebaseData.map(item => item.brand));
    return Array.from(brands).sort();
  }, [firebaseData]);

  const handleAnalysisFileImport = useCallback(async (files: FileList) => {
    setIsImporting(true);
    setImportError(null);
    setImportStats(null);

    try {
      let analysisStats = { added: 0, skipped: 0 };
      let linksStats = { added: 0, skipped: 0 };
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.name.match(/\.(xlsx|xls)$/i)) {
          throw new Error(`Le fichier "${file.name}" n'est pas un fichier Excel valide.`);
        }
        
        if (file.name.toLowerCase().includes('lien') || file.name.toLowerCase().includes('link')) {
          const links = await parsePriceLinks(file);
          linksStats = await savePriceLinks(links);
        } else {
          const data = await parsePriceAnalysis(file);
          analysisStats = await savePriceAnalysis(data);
        }
      }

      setImportStats({ analysis: analysisStats, links: linksStats });
      
      // Rafraîchir les données après l'import
      await refresh();
      
    } catch (err) {
      setImportError((err as Error).message || 'Erreur lors de l\'importation des fichiers.');
      console.error(err);
    } finally {
      setIsImporting(false);
    }
  }, [refresh]);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...firebaseData];

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

    result = result.map(item => ({
      ...item,
      margin: calculateMargin(item.priceBrand, item.priceArlettie, filters.discountPercentage)
    }));

    result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    return result;
  }, [firebaseData, sortConfig, filters]);

  return {
    items: filteredAndSortedItems,
    sortConfig,
    filters,
    availableBrands,
    handleSort: useCallback((key: keyof PriceAnalysis) => {
      setSortConfig(currentConfig => ({
        key,
        direction: currentConfig.key === key && currentConfig.direction === 'ascending'
          ? 'descending'
          : 'ascending'
      }));
    }, []),
    handleAnalysisFileImport,
    setFilters,
    isLoading: isLoadingData || isImporting,
    error: firebaseError || importError,
    importStats,
    refresh,
    isRefreshing
  };
};