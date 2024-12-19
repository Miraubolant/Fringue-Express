import { useEffect, useState } from 'react';
import { getTotalItemsCount } from '../utils/analytics';

export const useAnalyticsStats = () => {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalItems = async () => {
      try {
        const count = await getTotalItemsCount();
        setTotalItems(count);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchTotalItems();
  }, []);

  return { totalItems, loading, error };
};