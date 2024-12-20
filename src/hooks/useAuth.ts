import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';
import { useFavoritesStore } from '../store/favoritesStore';

export const useAuth = () => {
  const { setUser, setInitialized } = useAuthStore();
  const { loadFavorites } = useFavoritesStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitialized(true);
      
      // Charger les favoris quand l'utilisateur est connecté
      if (user) {
        loadFavorites();
      }
    });

    return () => unsubscribe();
  }, [setUser, setInitialized, loadFavorites]);

  return useAuthStore();
};