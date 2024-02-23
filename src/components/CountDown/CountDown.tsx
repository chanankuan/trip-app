import React, { useState, useEffect } from 'react';
import styles from './CountDown.module.css';

interface Props {
  startDate: Date;
}

const Countdown: React.FC<Props> = ({ startDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0',
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = startDate.getTime() - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString(),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      });
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
