import React, { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { addDoc, collection } from 'firebase/firestore';
import { uid } from 'uid';

import { db } from '../../server/firebase';
import styles from './Modal.module.css';
import cities from '../../data/cities.json';

interface Props {
  onCloseModal: (
    e:
      | MouseEvent<HTMLDivElement | HTMLButtonElement>
      | FormEvent<HTMLFormElement>
  ) => void;
}

const Modal: React.FC<Props> = ({ onCloseModal }) => {
  const [formData, setFormData] = useState({
    city: '',
    imageUrl: '',
    startDate: '',
    endDate: '',
  });

  const today = new Date();
  const fortnight = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
  const minDate = today.toISOString().split('T')[0];
  const maxDate = fortnight.toISOString().split('T')[0];

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;

    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  if (formData.startDate > formData.endDate && formData.endDate !== '') {
    setFormData(prevFormDate => ({ ...prevFormDate, endDate: '' }));
  }

  // write
  const addToDatabase = (): void => {
    const colRef = collection(db, 'trips');
    const uuid = uid();

    addDoc(colRef, {
      id: uuid,
      ...formData,
      imageUrl: cities.find(({ city }) => city === formData.city)?.imageUrl,
    }).then(() => {
      setFormData({
        city: '',
        imageUrl: '',
        startDate: '',
        endDate: '',
      });
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addToDatabase();
    onCloseModal(event);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h3>Create trip</h3>
            <button className={styles.button} onClick={onCloseModal}>
              <FaXmark />
            </button>
          </div>

          <div className={styles.body}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="city">
                <sup className={styles.sup}>*</sup>City
              </label>
              <select
                className={styles.formInput}
                name="city"
                id="city"
                onChange={handleChange}
                value={formData.city}
              >
                <option value="">Please select a city</option>
                {cities.map(({ city }) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="startDate">
                <sup className={styles.sup}>*</sup>Start date
              </label>
              <input
                className={styles.formInput}
                type="text"
                name="startDate"
                id="startDate"
                placeholder="Select date"
                value={formData.startDate}
                onChange={handleChange}
                onFocus={e => (e.target.type = 'date')}
                onBlur={e => (e.target.type = 'date')}
                min={minDate}
                max={maxDate}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="endDate">
                <sup className={styles.sup}>*</sup>End date
              </label>
              <input
                className={styles.formInput}
                type="text"
                name="endDate"
                id="endDate"
                placeholder="Select date"
                value={formData.endDate}
                onChange={handleChange}
                onFocus={e => (e.target.type = 'date')}
                onBlur={e => (e.target.type = 'date')}
                min={formData.startDate === '' ? minDate : formData.startDate}
                max={maxDate}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancel}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.submit}`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
