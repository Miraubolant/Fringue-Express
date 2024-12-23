import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserDocument } from '../types/user';

export const useUsers = () => {
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const userData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserDocument[];
        
        setUsers(userData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { users, loading, error };
};