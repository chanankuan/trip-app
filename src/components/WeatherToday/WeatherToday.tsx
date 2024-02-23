import React, { useEffect, useState } from 'react';
import styles from './WeatherToday.module.css';
import { getCurrentWeather } from '../../service/weather-api';
import getWeekDay from '../../helpers/getWeekDay';
import icons from '../../icons/WeatherIcons';
import Countdown from '../CountDown/CountDown';

interface Props {
  city: string;
  startDate: string;
  isActive?: boolean;
}

interface IWeather {
  city: string;
  weather: { [key: string]: any };
}

const WeatherToday: React.FC<Props> = ({ city, startDate, isActive }) => {
  const [data, setData] = useState<IWeather>({ city: '', weather: {} });

  useEffect(() => {
    getCurrentWeather(city).then(data =>
      setData({ city: data.address, weather: data.days[0] })
    );
  }, [city]);

  const { datetime, temp, icon } = data.weather;

  return (
    <div className={styles.container}>
      {temp && (
        <>
          <h3 className={styles.title}>{getWeekDay(datetime)}</h3>
          <div className={styles.wrapper}>
            {icons[icon]}
            <p className={styles.temp}>
              {Math.round(temp)}
              <sup>°C</sup>
            </p>
          </div>
          <p className={styles.city}>{data.city}</p>

          {isActive && <Countdown startDate={new Date(startDate)} />}
        </>
      )}
    </div>
  );
};

export default WeatherToday;
