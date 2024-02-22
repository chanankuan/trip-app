// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const FIREBASE_API = import.meta.env.VITE_REACT_FIREBASE_API;

const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: 'trip-app-project-32b5e.firebaseapp.com',
  projectId: 'trip-app-project-32b5e',
  storageBucket: 'trip-app-project-32b5e.appspot.com',
  messagingSenderId: '845344597407',
  appId: '1:845344597407:web:5e45015366cd28b31c49aa',
  measurementId: 'G-HBJNHEKYY0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
