import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { RemiseItem } from '../../../types/remise';
import { CategoryItem } from '../../CategoryPage/types';

export const useDataComparison = () => {
  const [remiseItems, setRemiseItems] = useState<RemiseItem[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les articles Arlettie
        const remiseSnapshot = await getDocs(collection(db, 'remise_items'));
        const remiseData = remiseSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as RemiseItem[];
        setRemiseItems(remiseData);

        // Récupérer les articles Seconde Main
        const categorySnapshot = await getDocs(collection(db, 'category_items'));
        const categoryData = categorySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as CategoryItem[];
        setCategoryItems(categoryData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    remiseItems,
    categoryItems,
    loading,
    error
  };
};