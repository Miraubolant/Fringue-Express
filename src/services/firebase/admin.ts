import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export const deleteCollection = async (collectionName: string) => {
  // Récupérer tous les documents de la collection
  const snapshot = await getDocs(collection(db, collectionName));
  
  // Si la collection est vide, ne rien faire
  if (snapshot.empty) return;

  // Supprimer les documents par lots de 500 (limite de Firestore)
  const batchSize = 500;
  const batches = [];
  let batch = writeBatch(db);
  let count = 0;

  snapshot.docs.forEach((document) => {
    batch.delete(doc(db, collectionName, document.id));
    count++;

    if (count === batchSize) {
      batches.push(batch.commit());
      batch = writeBatch(db);
      count = 0;
    }
  });

  // Supprimer le dernier lot s'il reste des documents
  if (count > 0) {
    batches.push(batch.commit());
  }

  // Attendre que toutes les suppressions soient terminées
  await Promise.all(batches);
};