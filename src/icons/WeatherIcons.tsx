/// <reference types="vite-plugin-svgr/client" />

import { ReactElement } from 'react';
import ClearDay from '../assets/weather-icons/clear-day.svg?react';
import ClearNight from '../assets/weather-icons/clear-night.svg?react';
import Cloudy from '../assets/weather-icons/cloudy.svg?react';
import Fog from '../assets/weather-icons/fog.svg?react';
import Hail from '../assets/weather-icons/hail.svg?react';
import PartlyCloudyDay from '../assets/weather-icons/partly-cloudy-day.svg?react';
import PartlyCloudyNight from '../assets/weather-icons/partly-cloudy-night.svg?react';
import RainSnowShowersDay from '../assets/weather-icons/rain-snow-showers-day.svg?react';
import RainSnowShowersNight from '../assets/weather-icons/rain-snow-showers-night.svg?react';
import RainSnow from '../assets/weather-icons/rain-snow.svg?react';
import Rain from '../assets/weather-icons/rain.svg?react';
import ShowersDay from '../assets/weather-icons/showers-day.svg?react';
import ShowersNight from '../assets/weather-icons/showers-night.svg?react';
import Sleet from '../assets/weather-icons/sleet.svg?react';
import SnowShowersDay from '../assets/weather-icons/snow-showers-day.svg?react';
import SnowShowersNight from '../assets/weather-icons/snow-showers-night.svg?react';
import Snow from '../assets/weather-icons/snow.svg?react';
import ThunderRain from '../assets/weather-icons/thunder-rain.svg?react';
import ThunderShowersDay from '../assets/weather-icons/thunder-showers-day.svg?react';
import ThunderShowersNight from '../assets/weather-icons/thunder-showers-night.svg?react';
import Thunder from '../assets/weather-icons/thunder.svg?react';
import Wind from '../assets/weather-icons/wind.svg?react';

interface WeatherIcons {
  [key: string]: ReactElement;
}

const weatherIcons: WeatherIcons = {
  'clear-day': <ClearDay width={40} />,
  'clear-night': <ClearNight width={40} />,
  cloudy: <Cloudy width={40} />,
  fog: <Fog width={40} />,
  hail: <Hail width={40} />,
  'partly-cloudy-day': <PartlyCloudyDay width={40} />,
  'partly-cloudy-night': <PartlyCloudyNight width={40} />,
  'rain-snow-showers-day': <RainSnowShowersDay width={40} />,
  'rain-snow-showers-night': <RainSnowShowersNight width={40} />,
  'rain-snow': <RainSnow width={40} />,
  rain: <Rain width={40} />,
  'showers-day': <ShowersDay width={40} />,
  'showers-night': <ShowersNight width={40} />,
  sleet: <Sleet width={40} />,
  'snow-showers-day': <SnowShowersDay width={40} />,
  'snow-showers-night': <SnowShowersNight width={40} />,
  snow: <Snow width={40} />,
  'thunder-rain': <ThunderRain width={40} />,
  'thunder-showers-day': <ThunderShowersDay width={40} />,
  'thunder-showers-night': <ThunderShowersNight width={40} />,
  thunder: <Thunder width={40} />,
  wind: <Wind width={40} />,
};

export default weatherIcons;
