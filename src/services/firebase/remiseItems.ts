import { 
  collection,
  getDocs,
  writeBatch,
  doc,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { RemiseItem } from '../../types/remise';

const COLLECTION_NAME = 'remise_items';
const remiseCollection = collection(db, COLLECTION_NAME);

export const saveRemiseItems = async (items: RemiseItem[]) => {
  const batch = writeBatch(db);
  let addedCount = 0;

  for (const item of items) {
    const docRef = doc(remiseCollection);
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
};

export const getRemiseItems = async (): Promise<RemiseItem[]> => {
  const snapshot = await getDocs(remiseCollection);
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  })) as RemiseItem[];
};

export const deleteRemiseItem = async (id: string): Promise<void> => {
  const docRef = doc(remiseCollection, id);
  await deleteDoc(docRef);
};