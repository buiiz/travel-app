import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

export const CurrencyWidget = ({ currency }) => {
  const { formatMessage: f } = useIntl();
  const [toUSD, setToUSD] = useState(null);
  const [toEUR, setToEUR] = useState(null);
  const [toRUB, setToRUB] = useState(null);

  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency}&symbols=USD`)
      .then((res) => res.json())
      .then((json) => {
        setToUSD(json.rates.USD.toFixed(2));
      })
      .catch(() => setToUSD(1));
  }, []);

  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency}&symbols=EUR`)
      .then((res) => res.json())
      .then((json) => {
        setToEUR(json.rates.EUR.toFixed(2));
      })
      .catch(() => setToEUR(1));
  }, []);

  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency}&symbols=RUB`)
      .then((res) => res.json())
      .then((json) => {
        setToRUB(json.rates.RUB.toFixed(2));
      })
      .catch(() => setToRUB(1));
  }, []);

  if (!toUSD || !toEUR || !toRUB) {
    return (
      <div className="m-4 p-10 text-white flex items-center justify-center bg-gray-900 rounded-xl bg-opacity-50 shadow-xl">
        {f({ id: 'load' })}...
      </div>
    );
  }

  return (
    <div className="m-4 p-10 flex items-center justify-center bg-gray-900 rounded-xl bg-opacity-50 shadow-xl">
      <div className="text-white font-medium text-lg text-center font-bold uppercase">
        {f({ id: currency.toLowerCase() })}
        <br />
        {f({ id: 'usd' })}: {toUSD}
        <br />
        {f({ id: 'eur' })}: {toEUR}
        <br />
        {f({ id: 'rub' })}: {toRUB}
      </div>
    </div>
  );
};
