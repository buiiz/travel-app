import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';
import ReactStars from 'react-rating-stars-component';

import { useEditPlaceMutation } from '../lib/graphql/editPlace.graphql';
import { useAuth } from '../lib/useAuth';

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

export default function RatingForm({ setShowModal, fetchCountry, setCountryInfo, placeId }) {
  const { formatMessage: f } = useIntl();
  const { user } = useAuth();
  const [editPlace] = useEditPlaceMutation();
  const router = useRouter();

  const [dataRating, setDataRating] = useState({
    userName: '',
    rate: 0,
    comment: '',
  });

  const { rate, comment } = dataRating;

  const ratingChanged = (newRating) => {
    setDataRating({ ...dataRating, rate: newRating });
  };

  const handleComment = (e) => {
    setDataRating({ ...dataRating, comment: e.target.value });
  };

  const onFinish = async (event) => {
    event.preventDefault();

    try {
      const { data } = await editPlace({
        variables: { input: { id: placeId, userName: user.name, rate, comment } },
      });

      if (data.editPlace._id) {
        toast.success('Added rating!', { duration: 2000 });
        await setCountryInfo(null);
        await fetchCountry();
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      className="w-full w-5/6 sm:5/6 md:w-3/4 xl:w-1/2 2xl:w-1/3"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={postVariants}>
      <div className="min-h-screen w-full bg-gray-300 py-6 flex fixed block top-0 left-0 bg-gray-400 opacity-95 z-30 flex-col justify-center sm:py-12">
        <div className="py-3 sm:max-w-xl sm:mx-auto">
          <div className="bg-white min-w-1xl opacity-99 z-50 flex flex-col rounded-xl shadow-lg">
            <div className="px-12 py-5">
              <h2 className="text-gray-800 text-3xl font-semibold">{f({ id: 'opinion' })}</h2>
            </div>
            <div className="bg-gray-200 w-full flex flex-col items-center">
              <div className="flex flex-col items-center py-6 space-y-3">
                <span className="text-lg text-gray-800">{f({ id: 'ratingQuestion' })}</span>
                <div className="flex space-x-3">
                  <ReactStars count={5} onChange={ratingChanged} size={32} activeColor="#ffd700" />
                </div>
              </div>
              <div className="w-3/4 flex flex-col">
                <textarea
                  rows={3}
                  value={comment}
                  onChange={handleComment}
                  className="p-4 text-gray-500 rounded-xl resize-none">
                  Leave a message, if you want
                </textarea>
                <button
                  onClick={onFinish}
                  className="z-40 py-3 my-8 focus:outline-none text-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-100 rounded-xl text-white">
                  {f({ id: 'rateButton' })}
                </button>
              </div>
            </div>
            <div className="h-20 flex items-center justify-center">
              <p
                role="presentation"
                className="text-gray-600 cursor-pointer hover:text-indigo-800"
                onClick={() => setShowModal(false)}>
                {f({ id: 'later' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const stars = () => {
  return (
    <>
      <svg
        className="w-12 h-12 text-yellow-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg
        className="w-12 h-12 text-yellow-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg
        className="w-12 h-12 text-yellow-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg
        className="w-12 h-12 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg
        className="w-12 h-12 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </>
  );
};
