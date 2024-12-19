import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { COLLECTIONS } from '../services/firebase/collections';
import { PriceAnalysis, PriceLink } from '../types';
import { mergeAnalysisData } from '../utils/dataMerger';

export const useFirebaseData = () => {
  const [data, setData] = useState<PriceAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const analysisSnapshot = await getDocs(collection(db, COLLECTIONS.PRICE_ANALYSIS));
      const analysis = analysisSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PriceAnalysis[];

      const linksSnapshot = await getDocs(collection(db, COLLECTIONS.PRICE_LINKS));
      const links = linksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PriceLink[];

      const mergedData = mergeAnalysisData(analysis, links);
      setData(mergedData);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  }, [fetchData]);

  useEffect(() => {
    setLoading(true);

    // Initial fetch
    fetchData().finally(() => setLoading(false));

    // Set up real-time listeners
    const unsubscribeAnalysis = onSnapshot(
      collection(db, COLLECTIONS.PRICE_ANALYSIS),
      () => fetchData()
    );

    const unsubscribeLinks = onSnapshot(
      collection(db, COLLECTIONS.PRICE_LINKS),
      () => fetchData()
    );

    return () => {
      unsubscribeAnalysis();
      unsubscribeLinks();
    };
  }, [fetchData]);

  return { data, loading, error, refresh, isRefreshing };
};