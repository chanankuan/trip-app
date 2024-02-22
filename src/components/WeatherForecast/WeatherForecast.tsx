import React, { useState, useEffect } from 'react';
import styles from './WeatherForecast.module.css';
import icons from '../../icons/WeatherIcons';
import getWeekDay from '../../helpers/getWeekDay';
import { getForecastWeather } from '../../api-service/weather-api';

interface Props {
  city: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const WeatherForecast: React.FC<Props> = ({
  city,
  startDate,
  endDate,
  isActive,
}) => {
  const [data, setData] = useState({ city: '', forecast: [] });

  useEffect(() => {
    getForecastWeather(city, startDate, endDate).then(data =>
      setData({ city: data.resolvedAddress, forecast: data.days })
    );
  }, [city]);

  return (
    <div>
      <h3 className={styles.title}>Week</h3>
      <ul className={styles.list}>
        {data.forecast.map(({ datetime, tempmin, tempmax, icon }) => {
          return (
            <li key={datetime} className={styles.item}>
              <p className={styles.day}>{getWeekDay(datetime)}</p>
              {icons[icon]}
              <p className={styles.temp}>
                {Math.round(tempmax)}°/{Math.round(tempmin)}°
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WeatherForecast;
