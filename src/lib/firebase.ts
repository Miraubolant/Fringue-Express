import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBwBiFALCuJZpaRS20aGwG0ZkDoNzWbxNU",
  authDomain: "fringue-express.firebaseapp.com",
  projectId: "fringue-express",
  storageBucket: "fringue-express.firebasestorage.app",
  messagingSenderId: "979091407801",
  appId: "1:979091407801:web:5adb9d17f073b706fb2c68",
  measurementId: "G-X3X6L77Q8N"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);