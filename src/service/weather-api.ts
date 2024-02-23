import axios from 'axios';

axios.defaults.baseURL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

const WEATHER_API = import.meta.env.VITE_REACT_WEATHER_API;

// API for getting today's weather for the city
export const getCurrentWeather = async (city: string) => {
  const { data } = await axios.get(
    `${city}/today?unitGroup=metric&include=days&key=${WEATHER_API}&contentType=json`
  );

  return data;
};

export const getForecastWeather = async (
  city: string,
  startDate: string,
  endDate: string
) => {
  const { data } = await axios.get(
    `${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${WEATHER_API}&contentType=json`
  );

  return data;
};
