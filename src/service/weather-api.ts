import axios from 'axios';
import { getCurrentLocation } from '../helpers/getCurrentLocation';

const WEATHER_API = import.meta.env.VITE_REACT_WEATHER_API;
const OPEN_WEATHER_API = import.meta.env.VITE_REACT_OPEN_WEATHER_API;
const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

// API for getting today's weather for the city
export const getCurrentWeather = async (city: string | undefined) => {
  let location: string;

  // Check if the city parameter is undefined
  if (city === undefined) {
    // Fetch user's current location using the Geolocation API
    try {
      const position = await getCurrentLocation();
      const lat: number = position.coords.latitude;
      const lon: number = position.coords.longitude;
      const { data } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPEN_WEATHER_API}`
      );
      location = data[0].name;
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
      `${BASE_URL}${location}/today?unitGroup=metric&include=days&key=${WEATHER_API}&contentType=json`
    );
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Handle the error as needed
  }
};

export const getForecastWeather = async (
  city: string,
  startDate: string,
  endDate: string
) => {
  const { data } = await axios.get(
    `${BASE_URL}${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${WEATHER_API}&contentType=json`
  );

  return data;
};
