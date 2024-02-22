import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

axios.defaults.baseURL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

// API for getting today's weather for the city
export const getCurrentWeather = async (city: string) => {
  const { data } = await axios.get(
    `${city}/today?unitGroup=metric&include=days&key=${process.env.WEATHER_API}&contentType=json`
  );

  return data;
};

export const getForecastWeather = async (
  city: string,
  from: Date,
  to: Date
) => {
  const { data } = await axios.get(
    `${city}/today?unitGroup=metric&include=days&key=${process.env.WEATHER_API}&contentType=json`
  );

  return data;
};
