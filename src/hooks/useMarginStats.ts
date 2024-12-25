import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { calculateMargin } from '../utils/calculations';
import { useDiscountStore } from '../store/discountStore';

interface MarginItem {
  reference: string;
  title: string;
  brand: string;
  priceBrand: number;
  priceArlettie: number;
  margin: number;
}

export const useMarginStats = () => {
  const [globalMargin, setGlobalMargin] = useState(0);
  const [topItems, setTopItems] = useState<MarginItem[]>([]);
  const [negativeItems, setNegativeItems] = useState<MarginItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { discountPercentage } = useDiscountStore();

  useEffect(() => {
    const fetchMarginStats = async () => {
      try {
        const remiseItems = collection(db, 'remise_items');
        const snapshot = await getDocs(remiseItems);
        const items = snapshot.docs.map(doc => {
          const data = doc.data();
          const margin = calculateMargin(data.priceBrand, data.priceArlettie, discountPercentage);
          return {
            reference: data.reference,
            title: data.title,
            brand: data.brand,
            priceBrand: data.priceBrand,
            priceArlettie: data.priceArlettie,
            margin
          };
        });

        // Calculer la marge moyenne globale
        const totalMargin = items.reduce((sum, item) => sum + item.margin, 0);
        setGlobalMargin(items.length > 0 ? totalMargin / items.length : 0);

        // Top 5 des articles les plus rentables
        const sortedItems = [...items].sort((a, b) => b.margin - a.margin);
        setTopItems(sortedItems.slice(0, 5));

        // Articles à marge négative
        setNegativeItems(items.filter(item => item.margin < 0));
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarginStats();
  }, [discountPercentage]);

  return {
    globalMargin,
    topItems,
    negativeItems,
    loading
  };
};