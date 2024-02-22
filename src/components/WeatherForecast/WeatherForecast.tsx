import React, { useState, useEffect } from 'react';
import styles from './WeatherForecast.module.css';
import icons from '../../icons/WeatherIcons';
import getWeekDay from '../../helpers/getWeekDay';

const WEATHER_API = import.meta.env.VITE_REACT_WEATHER_API;

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
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${WEATHER_API}&contentType=json`
    )
      .then(res => res.json())
      .then(data =>
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
