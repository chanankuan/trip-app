import React, { FormEvent, useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import styles from './Modal.module.css';
import cities from '../../data/cities.json';
import { addTrip } from '../../service/trips-service';
import { validateBody } from '../../helpers/validateBody';

interface Props {
  onCloseModal: () => void;
}

export type Trip = {
  city: string;
  startDate: string;
  endDate: string;
};

const initialData: Trip = {
  city: '',
  startDate: '',
  endDate: '',
};

const Modal: React.FC<Props> = ({ onCloseModal }) => {
  const [formData, setFormData] = useState<Trip>(initialData);

  const today: Date = new Date();
  const fortnight: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
  const minDate: string = today.toISOString().split('T')[0];
  const maxDate: string = fortnight.toISOString().split('T')[0];

  useEffect(() => {
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', closeOnEscapePressed);
    return () => window.removeEventListener('keydown', closeOnEscapePressed);
  }, []);

  // form onChange
  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.currentTarget;

    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  if (formData.startDate > formData.endDate && formData.endDate !== '') {
    setFormData(prevFormDate => ({ ...prevFormDate, endDate: '' }));
  }

  // submit form
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const isValid = validateBody(formData);
    if (!isValid) {
      alert('Fields must not be empty');
      return;
    }

    try {
      await addTrip(formData);
    } catch (error) {
      alert('Oops, something went wrong. Please refresh the page.');
    } finally {
      setFormData(initialData);
      onCloseModal();
    }
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
                className={styles.formSelect}
                name="city"
                id="city"
                onChange={handleChange}
                value={formData.city}
              >
                <option value="" disabled>
                  Please select a city
                </option>
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
              <div style={{ position: 'relative' }}>
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
                <button type="button" className={styles.openButton}>
                  📅
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="endDate">
                <sup className={styles.sup}>*</sup>End date
              </label>
              <div style={{ position: 'relative' }}>
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
                <button type="button" className={styles.openButton}>
                  📅
                </button>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancel}`}
              onClick={onCloseModal}
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
