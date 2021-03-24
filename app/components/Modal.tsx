import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';

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

export default function Modal({ setModal, propText }) {
  const { formatMessage: f } = useIntl();

  return (
    <div className="w-full h-full flex items-center justify-center fixed block top-0 left-0 bg-gray-400 opacity-80 z-40">
      <motion.div
        className="w-full w-5/6 sm:5/6 md:w-3/4 xl:w-1/2 2xl:w-1/3"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={postVariants}>
        <div className="leading-loose">
          <div className="m-4 relative p-10 bg-gray-800 opacity-99 z-50 rounded shadow-xl">
            <h1 className="text-white text-2xl font-bold">{f({ id: 'hello' })}</h1>
            <span className="text-white text-xl font-semibold">{f({ id: propText })}</span>
            <button
              className="text-white text-xl hover:text-yellow-500 focus:outline-none absolute bottom-3 right-10 block"
              onClick={() => setModal(false)}>
              {f({ id: 'close' })}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
