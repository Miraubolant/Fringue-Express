import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { FilterState, SortConfig } from '../types';
import { normalizeBrandName } from '../../../utils/brandNormalizer';

const ITEMS_PER_PAGE = 10;

export const useDataPage = () => {
  const [remiseItems, setRemiseItems] = useState<any[]>([]);
  const [categoryItems, setCategoryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    brand: null,
    source: null,
    priceRange: {
      min: null,
      max: null
    }
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'date',
    direction: 'desc'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Arlettie items
        const remiseSnapshot = await getDocs(collection(db, 'remise_items'));
        const remiseData = remiseSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          brand: normalizeBrandName(doc.data().brand)
        }));
        setRemiseItems(remiseData);

        // Fetch Category items
        const categorySnapshot = await getDocs(collection(db, 'category_items'));
        const categoryData = categorySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          brand: normalizeBrandName(doc.data().brand)
        }));
        setCategoryItems(categoryData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...remiseItems, ...categoryItems];

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(item => 
        item.title?.toLowerCase().includes(searchTerm) ||
        item.reference?.toLowerCase().includes(searchTerm) ||
        item.id?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.brand?.length) {
      result = result.filter(item => filters.brand?.includes(item.brand));
    }

    if (filters.source?.length) {
      result = result.filter(item => {
        if (filters.source?.includes('arlettie')) {
          return 'priceArlettie' in item;
        }
        if (filters.source?.includes('vinted') && item.link?.includes('vinted')) {
          return true;
        }
        if (filters.source?.includes('vestiaire') && item.link?.includes('vestiairecollective')) {
          return true;
        }
        return false;
      });
    }

    if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
      result = result.filter(item => {
        const price = item.priceArlettie || item.price;
        const minOk = filters.priceRange.min === null || price >= filters.priceRange.min;
        const maxOk = filters.priceRange.max === null || price <= filters.priceRange.max;
        return minOk && maxOk;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      
      switch (sortConfig.key) {
        case 'price':
          const priceA = a.priceArlettie || a.price;
          const priceB = b.priceArlettie || b.price;
          return (priceA - priceB) * direction;
        case 'brand':
          return a.brand.localeCompare(b.brand) * direction;
        case 'date':
        default:
          const dateA = a.createdAt?.toMillis() || 0;
          const dateB = b.createdAt?.toMillis() || 0;
          return (dateA - dateB) * direction;
      }
    });

    return result;
  }, [remiseItems, categoryItems, filters, sortConfig]);

  // Get unique brands for filter options
  const availableBrands = useMemo(() => {
    const brands = new Set([...remiseItems, ...categoryItems].map(item => item.brand));
    return Array.from(brands).sort();
  }, [remiseItems, categoryItems]);

  // Get paginated items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  return {
    items: paginatedItems,
    totalItems: remiseItems.length + categoryItems.length,
    filteredCount: filteredItems.length,
    currentPage,
    totalPages,
    filters,
    sortConfig,
    availableBrands,
    setCurrentPage,
    setFilters,
    setSortConfig,
    loading,
    error
  };
};