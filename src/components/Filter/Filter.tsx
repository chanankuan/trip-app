import React, { useState, ChangeEvent } from 'react';
import styles from './Filter.module.css';

interface Props {
  onFilterChange: (value: string) => void;
}

const Filter: React.FC<Props> = ({ onFilterChange }) => {
  const [input, setInput] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setInput(value);
    onFilterChange(value);
  };

  return (
    <input
      type="text"
      className={styles.form__input}
      placeholder="Search your trip"
      onChange={handleChange}
      value={input}
    />
  );
};

export default Filter;
