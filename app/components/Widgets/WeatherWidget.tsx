import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { convertFtoC } from '../../utils/utils';

const API_KEY_WEATHER = 'b96b3483c8a4a6510a423be0ef0914e7';

export const WeatherWidget = ({ countryCapital }) => {
  const [weatherData, setWeatherData] = useState(null);
  const { formatMessage: f, locale } = useIntl();

  useEffect(() => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${countryCapital}&appid=${API_KEY_WEATHER}&units=imperial&lang=${locale}`;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => setWeatherData(json));
  }, [locale]);

  if (!weatherData) {
    return (
      <div className="m-4 p-10 flex text-white items-center justify-center bg-gray-900 rounded-xl bg-opacity-50 shadow-xl">
        {f({ id: 'load' })}...
      </div>
    );
  }

  const weather = weatherData.weather[0];
  const iconUrl = `http://openweathermap.org/img/w/${weather.icon}.png`;

  return (
    <div className="m-4 p-10 bg-gray-900 rounded-xl bg-opacity-50 shadow-xl">
      <p className="text-white font-medium text-center text-lg font-bold uppercase weather-informer">
        {weather.description}
      </p>
      <div className="weather-main">
        <img src={iconUrl} alt={weatherData.description} width="70px" />
        <div className="weather-info block text-sm text-white">
          {f({ id: 'high' })}: {convertFtoC(weatherData.main.temp_max)}° <br />
          {f({ id: 'low' })}: {convertFtoC(weatherData.main.temp_min)}°
        </div>
      </div>
      <p className="text-white font-medium text-center text-lg font-bold">
        {f({ id: 'now' })}: {convertFtoC(weatherData.main.temp)}°
      </p>
    </div>
  );
};
