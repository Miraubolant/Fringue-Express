import { collection, getCountFromServer, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const getCategoryItemsCount = async (): Promise<number> => {
  const snapshot = await getCountFromServer(collection(db, 'category_items'));
  return snapshot.data().count;
};

export const getDiscountItemsCount = async (): Promise<number> => {
  const snapshot = await getCountFromServer(collection(db, 'remise_items'));
  return snapshot.data().count;
};

export const getUniqueBrandsCount = async (): Promise<number> => {
  // Récupérer uniquement les marques de la table remise_items
  const snapshot = await getDocs(collection(db, 'remise_items'));
  const brands = new Set(snapshot.docs.map(doc => doc.data().brand));
  return brands.size;
};