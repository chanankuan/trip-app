import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const CardItem: React.FC<Props> = ({ children }) => {
  return <li style={{ listStyle: 'none' }}>{children}</li>;
};

export default CardItem;
