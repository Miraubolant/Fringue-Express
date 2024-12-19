import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      error: null,
      initialized: false,
      signIn: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          set({ user: userCredential.user, loading: false });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        }
      },
      signUp: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          set({ user: userCredential.user, loading: false });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        }
      },
      signOut: async () => {
        set({ loading: true, error: null });
        try {
          await firebaseSignOut(auth);
          set({ user: null, loading: false });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        }
      },
      setUser: (user) => set({ user, loading: false }),
      setInitialized: (initialized) => set({ initialized }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);