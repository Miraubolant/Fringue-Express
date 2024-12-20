import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { RemiseItem } from '../../types/remise';

const COLLECTIONS = {
  SAVED_CARTS: 'saved_carts',
  FAVORITES: 'favorites'
} as const;

interface SavedCart {
  id: string;
  userId: string;
  name: string;
  items: RemiseItem[];
  createdAt: any;
}

// Gestion des paniers
export const savePanier = async (userId: string, name: string, items: RemiseItem[]): Promise<string> => {
  const cartRef = doc(collection(db, COLLECTIONS.SAVED_CARTS));
  const cartData: SavedCart = {
    id: cartRef.id,
    userId,
    name,
    items,
    createdAt: serverTimestamp()
  };
  
  await setDoc(cartRef, cartData);
  return cartRef.id;
};

export const getPaniers = async (userId: string): Promise<SavedCart[]> => {
  const q = query(
    collection(db, COLLECTIONS.SAVED_CARTS),
    where('userId', '==', userId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  })) as SavedCart[];
};

export const deletePanier = async (cartId: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTIONS.SAVED_CARTS, cartId));
};

// Gestion des favoris
export const saveFavorites = async (userId: string, favorites: string[]): Promise<void> => {
  await setDoc(doc(db, COLLECTIONS.FAVORITES, userId), {
    items: favorites,
    updatedAt: serverTimestamp()
  });
};

export const getFavorites = async (userId: string): Promise<string[]> => {
  const docRef = doc(db, COLLECTIONS.FAVORITES, userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data().items;
  }
  return [];
};