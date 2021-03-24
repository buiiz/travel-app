import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import ReactStars from 'react-rating-stars-component';

import { initializeApollo } from '../lib/apollo';
import { PlaceDocument } from '../lib/graphql/place.graphql';

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

export default function SelectionModal({ setSelectionModal, placeId, setShowModal }) {
  const { formatMessage: f } = useIntl();
  const [showFeedback, setShowFeedback] = useState(false);
  const [dataRating, setDataRating] = useState(null);

  const { locale } = useIntl();

  const fetchStream = async () => {
    const apollo = initializeApollo();
    const { data } = await apollo.query({
      query: PlaceDocument,
      variables: { id: placeId },
    });

    setDataRating(data.place);
  };

  const callAddingReview = () => {
    setSelectionModal(false);
    setShowModal(true);
  };

  const handleOpenList = async () => {
    await fetchStream();
    setShowFeedback(true);
  };

  const handleCloseSelectionModel = () => {
    setSelectionModal(false);
  };

  const handleCloseList = () => {
    setDataRating(null);
    setShowFeedback(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center fixed block top-0 left-0 bg-gray-400 opacity-80 z-40">
      {!showFeedback && (
        <motion.div
          className="w-full w-5/6 sm:1/2 md:w-1/3 xl:w-1/4"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={postVariants}>
          <div className="leading-loose">
            <div className="m-4 relative flex items-center justify-center flex-col p-3 bg-gray-800 opacity-99 z-50 rounded shadow-xl">
              <button
                className="text-white text-xl uppercase hover:text-yellow-500 focus:outline-none font-semibold block"
                onClick={handleOpenList}>
                {f({ id: 'feedbackSee' })}
              </button>
            </div>
            <div className="m-4 relative flex items-center justify-center flex-col p-3 bg-gray-800 opacity-99 z-50 rounded shadow-xl">
              <button
                className="text-white text-xl uppercase hover:text-yellow-500 focus:outline-none font-semibold block"
                onClick={callAddingReview}>
                {f({ id: 'feedbackGive' })}
              </button>
            </div>
            <div className="m-4 relative flex items-center justify-center flex-col p-3 bg-gray-800 opacity-99 z-50 rounded shadow-xl">
              <button
                className="text-white uppercase text-xl hover:text-yellow-500 focus:outline-none font-semibold block"
                onClick={handleCloseSelectionModel}>
                {f({ id: 'close' })}
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {showFeedback && dataRating && (
        <motion.div
          className="overflow-y-auto h-5/6 w-full w-5/6 sm:1/2 md:w-1/3 xl:w-1/4"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={postVariants}>
          <div className="leading-loose relative h-auto">
            <div className="m-2 relative flex items-start justify-center flex-col p-3 bg-gray-800 opacity-99 z-50 rounded shadow-xl">
              <span className="text-white text-xl font-bold">
                {f({ id: 'country' })}:{' '}
                <span className="text-yellow-300">{dataRating.country.data[locale].name}</span>
              </span>
              <span className="text-white text-xl font-bold">
                {f({ id: 'place' })}:{' '}
                <span className="text-yellow-300">{dataRating.data[locale].name}</span>
              </span>
            </div>
            <div className="m-2 relative flex items-start justify-center flex p-3 bg-gray-800 opacity-99 z-50 rounded shadow-xl">
              <ReactStars
                size={22}
                count={5}
                value={dataRating.averageRating}
                edit={false}
                color="white"
                activeColor="yellow"
              />
            </div>
            {!dataRating.rating.length && (
              <div className="m-2 relative flex items-center justify-center flex-col p-3 bg-gray-800 opacity-99 z-50 rounded shadow-xl">
                <div className="text-white text-base uppercase font-semibold block">
                  There are no reviews.
                </div>
              </div>
            )}
            {!!dataRating.rating.length &&
              dataRating.rating.map((rate, index) => (
                <div
                  key={rate.userId + index}
                  className="m-2 relative flex items-start justify-center flex-col p-3 bg-gray-800 opacity-99 z-50 rounded shadow-xl">
                  <div className="text-white text-base uppercase font-semibold block">
                    {rate.userName}
                  </div>
                  <div className="text-white text-base uppercase font-semibold block">
                    <ReactStars
                      size={22}
                      count={5}
                      value={rate.rate}
                      edit={false}
                      color="white"
                      activeColor="yellow"
                    />
                  </div>
                  <div className="text-white text-base font-base block">{rate.comment}</div>
                </div>
              ))}
            <div className="m-2 relative flex items-center justify-center flex-col p-3 bg-gray-800 opacity-99 z-50 rounded shadow-xl">
              <button
                className="text-white uppercase text-xl hover:text-yellow-500 focus:outline-none font-semibold block"
                onClick={handleCloseList}>
                {f({ id: 'close' })}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
