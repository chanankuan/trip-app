import React, { useState, useEffect, MouseEvent, FormEvent } from 'react';
import { FaPlus } from 'react-icons/fa';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

import styles from './Home.module.css';
import { db } from '../../server/firebase';
import SearchBar from '../../components/searchBar/SearchBar';
import CardList from '../../components/CardList/CardList';
import CardItem from '../../components/CardItem/CardItem';
import Trip from '../../components/Trip/Trip';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';
import Modal from '../Modal/Modal';

interface ITrip {
  id: string;
  city: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  owner: string;
}

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [filter, setFilter] = useState<string>('');

  const [activeIndex, setActiveIndex] = useState<null | string>(null);

  const onFilterChange = (value: string): void => {
    setFilter(value);
    setActiveIndex(null);
  };

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

  // get data from firebase
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userID') ?? '');
    const colRef = collection(db, 'trips');
    const q = query(
      colRef,
      where('owner', '==', userId),
      orderBy('startDate', 'asc')
    );

    onSnapshot(q, snapshot => {
      let trips: ITrip[] = [];

      snapshot.docs.forEach(doc => {
        const tripData = doc.data() as ITrip;
        trips.push({ ...tripData, id: doc.id });
      });

      setTrips(trips);
    });
  }, []);

  // filter trips
  const filteredTrips = trips.filter(trip =>
    trip.city.toLowerCase().includes(filter.toLowerCase())
  );

  // get trip data which is selected
  const selectedTrip = trips.find(trip => trip.id === activeIndex);

  return (
    <>
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

export default Home;
