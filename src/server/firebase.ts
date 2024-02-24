// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const FIREBASE_API = import.meta.env.VITE_REACT_FIREBASE_API;

const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: 'trip-app-57adc.firebaseapp.com',
  projectId: 'trip-app-57adc',
  storageBucket: 'trip-app-57adc.appspot.com',
  messagingSenderId: '2077667333',
  appId: '1:2077667333:web:e9de772417a94127672c6c',
  measurementId: 'G-CF9R44NLDG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
