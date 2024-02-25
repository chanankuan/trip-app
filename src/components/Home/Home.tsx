import React, { useState, useEffect, useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import {
  collection,
  where,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore';

import styles from './Home.module.css';
import { db } from '../../server/firebase';
import auth from '../../service/auth';
// Components
import { AuthContext, defaultValue } from '../context/AuthContext';
import CardItem from '../CardItem/CardItem';
import CardList from '../CardList/CardList';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import WeatherToday from '../WeatherToday/WeatherToday';
import Modal from '../Modal/Modal';
import Trip from '../Trip/Trip';
import Filter from '../Filter/Filter';
import { defaultTrip } from '../../data/defaultTrip';
import { addTrip } from '../../service/trips-service';

export type Trip = {
  id: string;
  city: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  owner?: string;
};

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  const onFilterChange = (value: string): void => {
    setFilter(value);
    setActiveIndex(null);
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await auth.signOutWithGoogle();
      authContext?.setUser(defaultValue);
    } catch (error) {
      alert('Oops, something went wrong. Please refresh the page.');
    }
  };

  // open modal fn
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  // close modal fn
  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  // get data from firebase
  useEffect(() => {
    const uid_json: string | null = localStorage.getItem('uid');
    if (!uid_json) return;
    const firstauth_json: string | null =
      localStorage.getItem('firstauth') ?? '';

    const userId: string = JSON.parse(uid_json);
    const colRef = collection(db, 'trips');
    const q = query(
      colRef,
      where('owner', '==', userId),
      orderBy('startDate', 'asc')
    );

    const isFirstAuth: string = JSON.parse(firstauth_json);
    if (isFirstAuth) {
      addTrip(defaultTrip);
      localStorage.setItem('firstauth', JSON.stringify(false));
    }

    onSnapshot(q, snapshot => {
      let trips: Trip[] = [];

      snapshot.docs.forEach(doc => {
        const tripData = doc.data() as Trip;
        trips.push({ ...tripData, id: doc.id });
      });

      setTrips(trips);
    });
  }, [authContext?.user]);

  // filter trips
  const filteredTrips: Trip[] = trips.filter(trip =>
    trip.city.toLowerCase().includes(filter.toLowerCase())
  );

  // get trip data which is selected
  const selectedTrip: Trip | undefined = trips.find(
    trip => trip.id === activeIndex
  );

  return (
    <>
      <WeatherToday
        city={selectedTrip?.city}
        startDate={selectedTrip?.startDate ?? ''}
        isActive={activeIndex !== null}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Weather <span className={styles.span}>Forecast</span>
          </h1>
          <button className={styles.logout} onClick={handleSignOut}>
            Logout
          </button>
        </div>

        <Filter onFilterChange={onFilterChange} />

        <CardList>
          {filteredTrips.map(({ id, city, imageUrl, startDate, endDate }) => {
            return (
              <CardItem key={id}>
                <Trip
                  city={city}
                  imageUrl={imageUrl}
                  startDate={startDate}
                  endDate={endDate}
                  id={id}
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
            city={selectedTrip?.city ?? ''}
            startDate={selectedTrip?.startDate ?? ''}
            endDate={selectedTrip?.endDate ?? ''}
            isActive={activeIndex !== null}
          />
        )}
      </div>

      {/* <WeatherToday
        city={selectedTrip?.city}
        startDate={selectedTrip?.startDate ?? ''}
        isActive={activeIndex !== null}
      /> */}

      {isModalOpen && <Modal onCloseModal={closeModal} />}
    </>
  );
};

export default Home;
