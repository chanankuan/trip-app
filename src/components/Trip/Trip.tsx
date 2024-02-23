import React, { MouseEvent } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import styles from './Trip.module.css';
import changeDateFormat from '../../helpers/changeDateFormat';
import { deleteTrip } from '../../service/trips-service';

interface Props {
  imageUrl: string;
  city: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  id: string;
  onShow: () => void;
}

const Trip: React.FC<Props> = ({
  city,
  imageUrl,
  startDate,
  endDate,
  isActive,
  id,
  onShow,
}) => {
  const datetime = `${changeDateFormat(startDate)} - ${changeDateFormat(
    endDate
  )}`;
  return (
    <div
      className={`${styles.wrapper} ${isActive && styles.active}`}
      onClick={onShow}
    >
      <div className={styles.hoverElement}>
        <button
          className={styles.deleteBtn}
          onClick={(e: MouseEvent<HTMLButtonElement>) => deleteTrip(e, id)}
        >
          <FaRegTrashCan />
        </button>
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
