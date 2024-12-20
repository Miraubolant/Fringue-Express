import { useEffect, useState } from 'react';
import { 
  getCategoryItemsCount, 
  getDiscountItemsCount,
  getUniqueBrandsCount 
} from '../utils/analytics';

export const useAnalyticsStats = () => {
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [discountCount, setDiscountCount] = useState<number>(0);
  const [brandCount, setBrandCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [catCount, discCount, brandsCount] = await Promise.all([
          getCategoryItemsCount(),
          getDiscountItemsCount(),
          getUniqueBrandsCount()
        ]);
        setCategoryCount(catCount);
        setDiscountCount(discCount);
        setBrandCount(brandsCount);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchStats();

    // Rafraîchir les données toutes les 30 secondes
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return { categoryCount, discountCount, brandCount, loading, error };
};