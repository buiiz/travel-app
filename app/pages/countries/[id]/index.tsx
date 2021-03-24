import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import Map from '../../../components/Map';
import Modal from '../../../components/Modal';
import Player from '../../../components/Player';
import RatingForm from '../../../components/RatingForm';
import SelectionModal from '../../../components/SelectionModal';
import SwiperApp from '../../../components/Swiper';
import { Widgets } from '../../../components/Widgets/Widgets';
import { initializeApollo } from '../../../lib/apollo';
import { CountryDocument, useCountryQuery } from '../../../lib/graphql/country.graphql';
import { getRandomImg } from '../../../utils/utils';

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

export default function Country({ id }) {
  const { locale } = useRouter();
  const [countryInfo, setCountryInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectionModal, setSelectionModal] = useState(false);

  const { data, loading, refetch } = useCountryQuery({
    variables: { countryId: id },
  });

  const REMAINDER = 'reminder';

  useEffect(() => {
    refetch();
  }, []);

  const fetchCountry = async () => {
    const apollo = initializeApollo();
    const { data } = await apollo.query({
      query: CountryDocument,
      variables: { countryId: id },
    });
    setCountryInfo(data);
  };

  useEffect(() => {
    setCountryInfo(data);
  }, [data, loading]);

  if (!countryInfo) {
    return <Loader show />;
  }

  const {
    country: { ISOCode, coordinates, data: dataCountry, currency, timeZone, videoUrl, imagesUrl },
  } = countryInfo;

  const imgUrl = getRandomImg(imagesUrl);

  const heroStyle = {
    backgroundImage: `url(${imgUrl})`,
  };

  return (
    <>
      <div className="container-country" style={heroStyle}>
        {showModal && (
          <RatingForm
            setShowModal={setShowModal}
            setCountryInfo={setCountryInfo}
            fetchCountry={fetchCountry}
            placeId={placeId}
          />
        )}
        {modal && <Modal setModal={setModal} propText={REMAINDER} />}
        {selectionModal && (
          <SelectionModal
            setShowModal={setShowModal}
            placeId={placeId}
            setSelectionModal={setSelectionModal}
          />
        )}
        <Head>
          <title>{dataCountry[locale].name}</title>
        </Head>
        <motion.div initial="initial" animate="enter" exit="exit" variants={postVariants}>
          <div className="box">
            <Header />
            <div className="mb-10 mt-10">
              <h1 className="title text-white text-center text-4xl sm:text-5xl text-6xl md:text-7xl font-bold shadow__item">
                {dataCountry[locale].name}
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-center text-white shadow__item">
                {dataCountry[locale].capital}
              </h2>
            </div>
            <Widgets capital={dataCountry.en.capital} currency={currency} timeZone={timeZone} />
            <p className="p-5 w-full text-sm sm:text-base md:text-xl lg:text-2xl text-white bg-gray-900 bg-opacity-50 mx-5 text-justify text-light-shadow rounded-xl mb-10">
              {dataCountry[locale].description}
            </p>
            <Player videoUrl={videoUrl} />
            <div className="w-full bg-gray-900 rounded-xl bg-opacity-50 mx-5 p-5 mb-10 flex justify-center box-border">
              <SwiperApp
                id={id}
                setPlaceId={setPlaceId}
                setSelectionModal={setSelectionModal}
                setModal={setModal}
              />
            </div>
            <div className="w-full min-w-0 bg-gray-900 rounded-xl bg-opacity-50 mx-5 p-5 mb-10 flex justify-center box-border">
              <Map ISOCode={ISOCode} locale={locale} coordinates={coordinates} />
            </div>
            <Footer />
          </div>
        </motion.div>
      </div>
    </>
  );
}

Country.getInitialProps = ({ query: { id } }) => {
  return { id };
};
