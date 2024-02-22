import React, { ReactNode } from 'react';
import styles from './Button.module.css';

interface Props {
  handleClick: () => void;
  children: ReactNode;
}

const Button: React.FC<Props> = ({ handleClick, children }) => {
  return (
    <button onClick={handleClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
