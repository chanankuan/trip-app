import axios from 'axios';
import { getCurrentLocation } from '../helpers/getCurrentLocation';

axios.defaults.baseURL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

const WEATHER_API = import.meta.env.VITE_REACT_WEATHER_API;

export const getCurrentWeather = async (city: string | undefined) => {
  let location: string;

  // Check if the city parameter is undefined
  if (city === undefined) {
    // Fetch user's current location using the Geolocation API
    try {
      const position: any = await getCurrentLocation();
      location = `${position.coords.latitude},${position.coords.longitude}`;
    } catch (error) {
      console.error('Error getting user location:', error);
      // Use a default value or handle the error as needed
      location = 'London';
    }
  } else {
    location = city;
  }

  try {
    const { data } = await axios.get(
      `${location}/today?unitGroup=metric&include=days&key=${WEATHER_API}&contentType=json`
    );

    return data;
  } catch (error) {
    alert('Oops, something went wrong. Please refresh the page.');
  }
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
