import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { COLLECTIONS } from '../services/firebase/collections';

export const getTotalItemsCount = async (): Promise<number> => {
  const analysisSnapshot = await getCountFromServer(collection(db, COLLECTIONS.PRICE_ANALYSIS));
  return analysisSnapshot.data().count;
};