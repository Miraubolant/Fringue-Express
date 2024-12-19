import { useEffect, useState } from 'react';
import { getTotalItemsCount, getCategoryItemsCount, getUniqueBrandsCount } from '../utils/analytics';

export const useAnalyticsStats = () => {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [categoryItems, setCategoryItems] = useState<number>(0);
  const [brandCount, setBrandCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [itemsCount, categoryCount, brandsCount] = await Promise.all([
          getTotalItemsCount(),
          getCategoryItemsCount(),
          getUniqueBrandsCount()
        ]);
        setTotalItems(itemsCount);
        setCategoryItems(categoryCount);
        setBrandCount(brandsCount);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { totalItems, categoryItems, brandCount, loading, error };
};