import React, { useState, useEffect } from 'react';
import styles from './CountDown.module.css';

interface Props {
  startDate: Date;
}

type Time = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const defaultTimeLeft: Time = {
  days: '0',
  hours: '0',
  minutes: '0',
  seconds: '0',
};

const Countdown: React.FC<Props> = ({ startDate }) => {
  const [timeLeft, setTimeLeft] = useState<Time>(defaultTimeLeft);

  useEffect(() => {
    const calculateTimeLeft = (): void => {
      const now: number = new Date().getTime();
      const difference: number = startDate.getTime() - now;
      const days: number = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours: number = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes: number = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds: number = Math.floor((difference % (1000 * 60)) / 1000);

      if (difference < 0) {
        setTimeLeft(defaultTimeLeft);
      } else {
        setTimeLeft({
          days: days.toString(),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0'),
        });
      }
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, [startDate]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.time}>
        {timeLeft.days} <span className={styles.desc}>Days</span>
      </p>
      <p className={styles.time}>
        {timeLeft.hours} <span className={styles.desc}>Hours</span>
      </p>
      <p className={styles.time}>
        {timeLeft.minutes} <span className={styles.desc}>Minutes</span>
      </p>
      <p className={styles.time}>
        {timeLeft.seconds} <span className={styles.desc}>Seconds</span>
      </p>
    </div>
  );
};

export default Countdown;
