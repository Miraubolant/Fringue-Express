import { doc, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { User } from 'firebase/auth';

export const createUserDocument = async (user: User) => {
  if (!user.email) return;

  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    email: user.email,
    role: 'user',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const updateUserRole = async (userId: string, role: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    role,
    updatedAt: serverTimestamp()
  });
};

export const deleteUser = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  await deleteDoc(userRef);
};