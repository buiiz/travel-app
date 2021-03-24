import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { useAppContext } from '../contexts/state';
import { Country, useCountriesQuery } from '../lib/graphql/countries.graphql';

const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

interface item {
  country: string;
  capital: string;
  src: string;
  id: number;
}

export default function Home() {
  const { formatMessage: f } = useIntl();
  const { locale } = useRouter();
  const { data, loading, refetch } = useCountriesQuery({ errorPolicy: 'ignore' });
  const { text } = useAppContext();

  const [dataCountry, setDataCountry] = useState([]);
  const [searchText, setSearchText] = useState(text);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data && !loading) {
      setDataCountry([...data.countries]);
    }
  }, [data]);

  const sortCountry = (text) => {
    let newData = [];
    if (!data) {
      return;
    }

    newData = data.countries.filter(
      ({ data }) =>
        data[locale].name.toLowerCase().match(text.toLowerCase()) ||
        data[locale].capital.toLowerCase().match(text.toLowerCase()),
    );
    setDataCountry(newData);
  };

  useEffect(() => {
    sortCountry(text);
    setSearchText(text);
  }, [text]);

  const emptySearchMessage = (
    <span className="title block text-white mt-40 text-center text-4xl">
      {f({ id: 'emptySearch' })}
    </span>
  );

  return (
    <>
      <Head>
        <title>Countries</title>
      </Head>
      <div className="default-page">
        <div className="container">
          <Header />
          <motion.div
            style={{ padding: '0 15px', margin: '0 auto' }}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={postVariants}>
            {loading && <Loader show={loading} />}
            {!loading &&
              data &&
              data.countries &&
              (dataCountry.length > 0 ? (
                <div className="countries">
                  {dataCountry.map((item) => (
                    <Card key={item._id} item={item as Country} />
                  ))}
                </div>
              ) : (
                emptySearchMessage
              ))}
          </motion.div>
          <Footer />
        </div>
      </div>
    </>
  );
}
