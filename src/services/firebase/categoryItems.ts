import { 
  collection,
  getDocs,
  writeBatch,
  doc,
  serverTimestamp,
  query,
  where,
  runTransaction,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { CategoryItem } from '../../pages/CategoryPage/types';

const COLLECTION_NAME = 'category_items';
const categoryCollection = collection(db, COLLECTION_NAME);

export const saveCategoryItems = async (items: CategoryItem[]) => {
  return runTransaction(db, async (transaction) => {
    const batch = writeBatch(db);
    let addedCount = 0;

    for (const item of items) {
      const docRef = doc(categoryCollection);
      batch.set(docRef, {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      addedCount++;
    }

    if (addedCount > 0) {
      await batch.commit();
    }

    return {
      added: addedCount,
      skipped: items.length - addedCount
    };
  });
};

export const getCategoryItems = async (): Promise<CategoryItem[]> => {
  const snapshot = await getDocs(categoryCollection);
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  })) as CategoryItem[];
};

export const deleteCategoryItem = async (id: string): Promise<void> => {
  const docRef = doc(categoryCollection, id);
  await deleteDoc(docRef);
};