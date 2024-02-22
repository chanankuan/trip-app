import React, { useState, MouseEvent, useEffect, FormEvent } from 'react';
import { FaPlus } from 'react-icons/fa';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

import styles from './App.module.css';
import { db } from './server/firebase';
import SearchBar from './components/searchBar/SearchBar';
import CardList from './components/CardList/CardList';
import CardItem from './components/CardItem/CardItem';
import Trip from './components/Trip/Trip';
import Button from './components/Button/Button';
import Container from './components/Container/Container';
import Modal from './components/Modal/Modal';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import signInWithGoogle from './helpers/signIn';

interface Trip {
  id: string;
  city: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  owner: string;
}

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<null | string>(null);

  const onFilterChange = (value: string): void => {
    setFilter(value);
    setActiveIndex(null);
  };

  // get data from firebase
  useEffect(() => {
    const colRef = collection(db, 'trips');
    const q = query(
      colRef,
      where('owner', '==', 100001),
      orderBy('startDate', 'asc')
    );

    onSnapshot(q, snapshot => {
      let trips: Trip[] = [];

      snapshot.docs.forEach(doc => {
        const tripData = doc.data() as Trip;
        trips.push({ ...tripData, id: doc.id });
      });

      setTrips(trips);
    });
  }, []);

  // filter trips
  const filteredTrips = trips.filter(trip =>
    trip.city.toLowerCase().includes(filter.toLowerCase())
  );

  // open modal fn
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  // close modal fn
  const closeModal = (
    e:
      | MouseEvent<HTMLDivElement | HTMLButtonElement>
      | FormEvent<HTMLFormElement>
  ) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  // get trip data which is selected
  const selectedTrip = trips.find(trip => trip.id === activeIndex);

  return (
    <>
      {}
      <div className={styles.container}>
        <h1 className={styles.title}>
          Weather <span className={styles.span}>Forecast</span>
        </h1>

        <SearchBar onFilterChange={onFilterChange} />

        <CardList>
          {filteredTrips.map(({ id, city, imageUrl, startDate, endDate }) => {
            return (
              <CardItem key={id}>
                <Trip
                  city={city}
                  imageUrl={imageUrl}
                  startDate={startDate}
                  endDate={endDate}
                  isActive={activeIndex === id}
                  onShow={() => setActiveIndex(id)}
                />
              </CardItem>
            );
          })}
          <CardItem key="addButton">
            <button className={styles.addTripBtn} onClick={openModal}>
              <FaPlus />
              Add trip
            </button>
          </CardItem>
        </CardList>

        {activeIndex && (
          <WeatherForecast
            city={selectedTrip?.city || ''}
            startDate={selectedTrip?.startDate || ''}
            endDate={selectedTrip?.endDate || ''}
            isActive={activeIndex !== null}
          />
        )}
      </div>

      {isModalOpen && <Modal onCloseModal={closeModal} />}
    </>
  );
};

export default App;
