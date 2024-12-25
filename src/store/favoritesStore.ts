import { create } from 'zustand';
import { auth } from '../lib/firebase';
import { saveFavorites as saveFavoritesToFirebase, getFavorites as getFavoritesFromFirebase } from '../services/firebase/userPreferences';

interface FavoritesState {
  favorites: string[];
  isLoading: boolean;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
  getFavoritesCount: () => number;
  loadFavorites: () => Promise<void>;
  clearFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  isLoading: false,

  addFavorite: async (id) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    set({ isLoading: true });
    try {
      const newFavorites = [...get().favorites, id];
      await saveFavoritesToFirebase(userId, newFavorites);
      set({ favorites: newFavorites });
    } finally {
      set({ isLoading: false });
    }
  },

  removeFavorite: async (id) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    set({ isLoading: true });
    try {
      const newFavorites = get().favorites.filter(favId => favId !== id);
      await saveFavoritesToFirebase(userId, newFavorites);
      set({ favorites: newFavorites });
    } finally {
      set({ isLoading: false });
    }
  },

  toggleFavorite: async (id) => {
    if (get().isFavorite(id)) {
      await get().removeFavorite(id);
    } else {
      await get().addFavorite(id);
    }
  },

  isFavorite: (id) => get().favorites.includes(id),
  
  getFavoritesCount: () => get().favorites.length,

  loadFavorites: async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    set({ isLoading: true });
    try {
      const favorites = await getFavoritesFromFirebase(userId);
      set({ favorites });
    } finally {
      set({ isLoading: false });
    }
  },

  clearFavorites: async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    set({ isLoading: true });
    try {
      await saveFavoritesToFirebase(userId, []);
      set({ favorites: [] });
    } finally {
      set({ isLoading: false });
    }
  }
}));