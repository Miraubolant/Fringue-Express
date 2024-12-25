import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ComparisonItem } from '../../types/comparison';

interface SavedComparison {
  name: string;
  items: ComparisonItem[];
  createdAt: Date;
}

export const saveComparison = async (userId: string, comparison: SavedComparison) => {
  const comparisonRef = doc(collection(db, 'comparisons'));
  
  await setDoc(comparisonRef, {
    userId,
    name: comparison.name,
    items: comparison.items,
    createdAt: serverTimestamp()
  });

  return comparisonRef.id;
};