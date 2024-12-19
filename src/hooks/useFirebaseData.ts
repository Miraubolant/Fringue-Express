import { useState, useEffect, useCallback, useRef } from 'react';
import { collection, onSnapshot, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { COLLECTIONS } from '../services/firebase/collections';
import { PriceAnalysis, PriceLink } from '../types';
import { mergeAnalysisData } from '../utils/dataMerger';

export const useFirebaseData = () => {
  const [data, setData] = useState<PriceAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Références pour le cache et les unsubscribe
  const cache = useRef<{
    analysis: QuerySnapshot<DocumentData> | null;
    links: QuerySnapshot<DocumentData> | null;
  }>({ analysis: null, links: null });
  
  const unsubscribeRefs = useRef<{ [key: string]: () => void }>({});

  // Fonction pour traiter les snapshots et mettre à jour les données
  const processSnapshots = useCallback(() => {
    if (!cache.current.analysis || !cache.current.links) return;

    const analysis = cache.current.analysis.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PriceAnalysis[];

    const links = cache.current.links.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PriceLink[];

    const mergedData = mergeAnalysisData(analysis, links);
    setData(mergedData);
  }, []);

  // Fonction pour initialiser les listeners une seule fois
  const initializeListeners = useCallback(() => {
    if (unsubscribeRefs.current.analysis || unsubscribeRefs.current.links) return;

    unsubscribeRefs.current.analysis = onSnapshot(
      collection(db, COLLECTIONS.PRICE_ANALYSIS),
      (snapshot) => {
        cache.current.analysis = snapshot;
        processSnapshots();
      },
      (err) => setError((err as Error).message)
    );

    unsubscribeRefs.current.links = onSnapshot(
      collection(db, COLLECTIONS.PRICE_LINKS),
      (snapshot) => {
        cache.current.links = snapshot;
        processSnapshots();
      },
      (err) => setError((err as Error).message)
    );
  }, [processSnapshots]);

  // Fonction de rafraîchissement manuel
  const refresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    
    try {
      const [analysisSnapshot, linksSnapshot] = await Promise.all([
        getDocs(collection(db, COLLECTIONS.PRICE_ANALYSIS)),
        getDocs(collection(db, COLLECTIONS.PRICE_LINKS))
      ]);

      cache.current = {
        analysis: analysisSnapshot,
        links: linksSnapshot
      };

      processSnapshots();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, processSnapshots]);

  // Effet d'initialisation
  useEffect(() => {
    setLoading(true);
    
    // Charger les données initiales
    refresh().finally(() => setLoading(false));
    
    // Initialiser les listeners
    initializeListeners();

    // Cleanup
    return () => {
      Object.values(unsubscribeRefs.current).forEach(unsubscribe => unsubscribe());
      unsubscribeRefs.current = {};
    };
  }, [refresh, initializeListeners]);

  return {
    data,
    loading,
    error,
    refresh,
    isRefreshing
  };
};