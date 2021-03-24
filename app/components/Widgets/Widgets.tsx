import React from 'react';

import { CurrencyWidget } from './CurrencyWidget';
import { TimeWidget } from './TimeWidget';
import { WeatherWidget } from './WeatherWidget';

export const Widgets = ({ capital, currency, timeZone }) => {
  return (
    <div className="widget-container">
      <WeatherWidget countryCapital={capital} data-testid="weather-widget" />
      <CurrencyWidget currency={currency} />
      <TimeWidget timeZone={timeZone} />
    </div>
  );
};
