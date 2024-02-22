import React from 'react';
import styles from './Trip.module.css';
import changeDateFormat from '../../helpers/changeDateFormat';

interface Props {
  imageUrl: string;
  city: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  onShow: () => void;
}

const Trip: React.FC<Props> = ({
  city,
  imageUrl,
  startDate,
  endDate,
  // isActive,
  onShow,
}) => {
  const datetime = `${changeDateFormat(startDate)} - ${changeDateFormat(
    endDate
  )}`;
  return (
    <div className={styles.wrapper} onClick={onShow}>
      <div className={styles.hoverElement}>
        <button className={styles.deleteBtn}>Delete</button>
      </div>
      <img
        className={styles.cover}
        src={imageUrl}
        alt={city}
        width={200}
        height={200}
      />
      <div className={styles.body}>
        <h3 className={styles.title}>{city}</h3>
        <p className={styles.datetime}>{datetime}</p>
      </div>
    </div>
  );
};

export default Trip;
