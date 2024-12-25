import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getSourceFromItem } from '../pages/CategoryPage/utils/sourceDetector';

interface PlatformStats {
  platform: 'vinted' | 'vestiaire';
  averagePrice: number;
  itemCount: number;
  trend: number;
}

export const usePlatformStats = () => {
  const [stats, setStats] = useState<PlatformStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const categoryItems = collection(db, 'category_items');
        const snapshot = await getDocs(categoryItems);
        const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        // Grouper les articles par plateforme
        const vintedItems = items.filter(item => getSourceFromItem(item) === 'vinted');
        const vestiaireItems = items.filter(item => getSourceFromItem(item) === 'vestiaire');

        // Calculer les statistiques pour chaque plateforme
        const calculateStats = (items: any[]): Omit<PlatformStats, 'platform'> => {
          if (items.length === 0) return { averagePrice: 0, itemCount: 0, trend: 0 };
          
          const prices = items.map(item => item.price).filter(price => !isNaN(price));
          const total = prices.reduce((sum, price) => sum + price, 0);
          
          return {
            averagePrice: total / prices.length || 0,
            itemCount: items.length,
            // Pour l'instant, on simule une tendance aléatoire
            trend: Math.round((Math.random() * 20) - 10)
          };
        };

        setStats([
          {
            platform: 'vinted',
            ...calculateStats(vintedItems)
          },
          {
            platform: 'vestiaire',
            ...calculateStats(vestiaireItems)
          }
        ]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};