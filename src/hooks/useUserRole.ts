import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserDocument } from '../types/user';

export const useUserRole = (userId: string | undefined) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    // Écouter les changements en temps réel du document utilisateur
    const unsubscribe = onSnapshot(
      doc(db, 'users', userId),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data() as UserDocument;
          setIsAdmin(userData.role === 'admin');
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching user role:', error);
        setIsAdmin(false);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { isAdmin, loading };
};