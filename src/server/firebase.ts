// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCy9858QMjHXQZcKwg6TFoT5SZxqCbSAeU',
  authDomain: 'trip-app-57adc.firebaseapp.com',
  projectId: 'trip-app-57adc',
  storageBucket: 'trip-app-57adc.appspot.com',
  messagingSenderId: '2077667333',
  appId: '1:2077667333:web:ce2fcdc0325c2fe6672c6c',
  measurementId: 'G-QF0X9Y54V4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
