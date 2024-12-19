import { collection, getCountFromServer, query, distinct, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { COLLECTIONS } from '../services/firebase/collections';

export const getTotalItemsCount = async (): Promise<number> => {
  const analysisSnapshot = await getCountFromServer(collection(db, COLLECTIONS.PRICE_ANALYSIS));
  return analysisSnapshot.data().count;
};

export const getCategoryItemsCount = async (): Promise<number> => {
  const categorySnapshot = await getCountFromServer(collection(db, 'category_items'));
  return categorySnapshot.data().count;
};

export const getUniqueBrandsCount = async (): Promise<number> => {
  const snapshot = await getDocs(collection(db, COLLECTIONS.PRICE_ANALYSIS));
  const brands = new Set(snapshot.docs.map(doc => doc.data().brand));
  return brands.size;
};