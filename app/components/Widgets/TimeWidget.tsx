import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

export const TimeWidget = ({ timeZone }) => {
  const { formatMessage: f, locale } = useIntl();
  const [todayTime, setTodayTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTodayTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => setTodayTime(Date.now()), [locale]);

  const timer = new Date(todayTime).toLocaleTimeString(`${locale}`, {
    timeZone: `${timeZone}`,
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const [dayOfWeek, date] = new Date(todayTime)
    .toLocaleTimeString(`${locale}`, {
      timeZone: `${timeZone}`,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
    .split(',');

  if (!todayTime) {
    return (
      <div className="m-4 p-10 flex text-white items-center justify-center bg-gray-900 rounded-xl bg-opacity-50 shadow-xl">
        {f({ id: 'load' })}...
      </div>
    );
  }

  return (
    <div className="m-4 p-10 flex flex-col items-center justify-center bg-gray-900 rounded-xl bg-opacity-50 rounded shadow-xl">
      <p className="text-white font-medium text-center text-lg font-bold uppercase">
        {dayOfWeek}
        <br />
        {date}
      </p>
      <p className="m-2 weather-info block text-sm text-center text-white">{timer}</p>
    </div>
  );
};
