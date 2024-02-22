import React, { ReactNode } from 'react';
import styles from './CardList.module.css';

interface Props {
  children: ReactNode;
}

const CardList: React.FC<Props> = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default CardList;
