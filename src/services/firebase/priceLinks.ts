import { 
  getDocs, 
  writeBatch,
  doc,
  serverTimestamp,
  query,
  where,
  runTransaction
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { priceLinksCollection } from './collections';
import type { PriceLink } from '../../types';

export const savePriceLinks = async (data: PriceLink[]) => {
  return runTransaction(db, async (transaction) => {
    const existingRefs = new Set<string>();
    
    // Récupérer toutes les références existantes
    for (const item of data) {
      const q = query(priceLinksCollection, where('reference', '==', item.reference));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        existingRefs.add(item.reference);
      }
    }

    // Créer uniquement les nouveaux documents
    const batch = writeBatch(db);
    let addedCount = 0;

    for (const item of data) {
      if (!existingRefs.has(item.reference)) {
        const docRef = doc(priceLinksCollection);
        batch.set(docRef, {
          ...item,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        addedCount++;
      }
    }

    if (addedCount > 0) {
      await batch.commit();
    }

    return {
      added: addedCount,
      skipped: data.length - addedCount
    };
  });
};

export const getPriceLinks = async (): Promise<PriceLink[]> => {
  const snapshot = await getDocs(priceLinksCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as PriceLink[];
};