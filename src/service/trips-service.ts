import { doc, deleteDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../server/firebase';
import cities from '../data/cities.json';
import { MouseEvent } from 'react';

interface ITrip {
  city: string;
  startDate: string;
  endDate: string;
  id?: string;
}

export const addTrip = async (data: ITrip) => {
  const colRef = collection(db, 'trips');
  const owner = JSON.parse(localStorage.getItem('userID') || '');

  await addDoc(colRef, {
    ...data,
    imageUrl: cities.find(({ city }) => city === data.city)?.imageUrl,
    owner,
  });
};

export const deleteTrip = async (
  e: MouseEvent<HTMLButtonElement>,
  id: string
) => {
  e.stopPropagation();
  await deleteDoc(doc(db, 'trips', id));
};
