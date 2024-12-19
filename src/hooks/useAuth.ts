import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { setUser, setInitialized } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [setUser, setInitialized]);

  return useAuthStore();
};