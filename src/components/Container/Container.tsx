import React, { ReactNode } from 'react';
import styles from './Container.module.css';

interface Props {
  children: ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
