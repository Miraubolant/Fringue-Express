import { create } from 'zustand';
import { RemiseItem } from '../types/remise';
import { auth } from '../lib/firebase';
import { savePanier, getPaniers, deletePanier } from '../services/firebase/userPreferences';

interface SavedCart {
  id: string;
  name: string;
  items: RemiseItem[];
  createdAt: number;
}

interface CartState {
  items: RemiseItem[];
  savedCarts: SavedCart[];
  isLoading: boolean;
  addItem: (item: RemiseItem) => void;
  removeItem: (reference: string) => void;
  clearCart: () => void;
  isInCart: (reference: string) => boolean;
  saveCurrentCart: (name: string) => Promise<void>;
  loadCart: (cartId: string) => void;
  deleteCart: (cartId: string) => Promise<void>;
  getSavedCarts: () => SavedCart[];
  loadSavedCarts: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  savedCarts: [],
  isLoading: false,
  
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  
  removeItem: (reference) => set((state) => ({
    items: state.items.filter(item => item.reference !== reference)
  })),
  
  clearCart: () => set({ items: [] }),
  
  isInCart: (reference) => get().items.some(item => item.reference === reference),
  
  saveCurrentCart: async (name) => {
    const userId = auth.currentUser?.uid;
    if (!userId || get().items.length === 0) return;

    set({ isLoading: true });
    try {
      const cartId = await savePanier(userId, name, get().items);
      const newCart: SavedCart = {
        id: cartId,
        name,
        items: get().items,
        createdAt: Date.now()
      };
      set((state) => ({ 
        savedCarts: [...state.savedCarts, newCart]
      }));
    } finally {
      set({ isLoading: false });
    }
  },

  loadCart: (cartId) => {
    const cart = get().savedCarts.find(c => c.id === cartId);
    if (cart) {
      set({ items: cart.items });
    }
  },

  deleteCart: async (cartId) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    set({ isLoading: true });
    try {
      await deletePanier(cartId);
      set((state) => ({
        savedCarts: state.savedCarts.filter(cart => cart.id !== cartId)
      }));
    } finally {
      set({ isLoading: false });
    }
  },

  getSavedCarts: () => get().savedCarts,

  loadSavedCarts: async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    set({ isLoading: true });
    try {
      const carts = await getPaniers(userId);
      set({ savedCarts: carts });
    } finally {
      set({ isLoading: false });
    }
  }
}));