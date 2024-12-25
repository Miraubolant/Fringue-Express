import { create } from 'zustand';
import { RemiseItem } from '../types/remise';
import { CategoryItem } from '../pages/CategoryPage/types';
import { auth } from '../lib/firebase';
import { saveComparison as saveComparisonToFirebase } from '../services/firebase/comparisons';

interface ComparisonItem {
  type: 'remise' | 'category';
  source: 'arlettie' | 'vinted' | 'vestiaire';
  item: RemiseItem | CategoryItem;
}

interface ComparisonStore {
  items: ComparisonItem[];
  isLoading: boolean;
  addItem: (type: 'remise' | 'category', item: RemiseItem | CategoryItem) => void;
  removeItem: (type: 'remise' | 'category', id: string) => void;
  clearComparison: () => void;
  isInComparison: (type: 'remise' | 'category', id: string) => boolean;
  saveComparison: (name: string) => Promise<void>;
}

const detectSource = (item: RemiseItem | CategoryItem): 'arlettie' | 'vinted' | 'vestiaire' => {
  if ('priceArlettie' in item) return 'arlettie';
  if (item.link?.toLowerCase().includes('vinted')) return 'vinted';
  return 'vestiaire';
};

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
  items: [],
  isLoading: false,
  
  addItem: (type, item) => {
    const source = detectSource(item);
    set((state) => ({
      items: [...state.items, { type, source, item }]
    }));
  },
  
  removeItem: (type, id) => set((state) => ({
    items: state.items.filter(i => {
      if (type === 'remise') {
        return !(i.type === type && (i.item as RemiseItem).reference === id);
      }
      return !(i.type === type && (i.item as CategoryItem).id === id);
    })
  })),
  
  clearComparison: () => set({ items: [] }),
  
  isInComparison: (type, id) => {
    const { items } = get();
    return items.some(i => {
      if (type === 'remise') {
        return i.type === type && (i.item as RemiseItem).reference === id;
      }
      return i.type === type && (i.item as CategoryItem).id === id;
    });
  },

  saveComparison: async (name: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId || get().items.length === 0) return;

    set({ isLoading: true });
    try {
      await saveComparisonToFirebase(userId, {
        name,
        items: get().items,
        createdAt: new Date()
      });
    } finally {
      set({ isLoading: false });
    }
  }
}));