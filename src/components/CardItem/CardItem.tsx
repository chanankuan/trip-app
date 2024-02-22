import React, { ReactNode } from 'react';
import styles from './CardItem.module.css';

interface Props {
  children: ReactNode;
}

const CardItem: React.FC<Props> = ({ children }) => {
  return <li style={{ listStyle: 'none' }}>{children}</li>;
};

export default CardItem;
