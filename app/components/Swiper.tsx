import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useFullscreen } from 'react-use';
import SwiperCore, { A11y, Controller, EffectCube, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { usePlacesQuery } from '../lib/graphql/places.graphql';
import { useAuth } from '../lib/useAuth';

SwiperCore.use([Navigation, Controller, A11y, EffectCube]);

export default function SwiperApp({ id, setSelectionModal, setPlaceId, setModal }) {
  const { data, loading, refetch } = usePlacesQuery({ variables: { countryId: id } });
  const [places, setPlaces] = useState(null);
  const { locale } = useRouter();
  const { user } = useAuth();

  const ref = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  useFullscreen(ref, isFullscreen, { onClose: () => setIsFullscreen(false) });

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setPlaces([...data.places]);
    }
  }, [data, loading]);

  const callingRatingForms = (id) => {
    if (!user) {
      return setModal(true);
    }
    setPlaceId(id);
    setSelectionModal(true);
  };

  return (
    <main ref={ref} className="w-full">
      {places && (
        <>
          <Swiper
            navigation
            loop
            lazy
            centeredSlides
            effect="cube"
            className="pt-3 pb-3"
            loopedSlides={6}
            spaceBetween={30}
            onSwiper={setFirstSwiper}
            controller={{ control: secondSwiper }}>
            {places.map((place, index) => (
              <SwiperSlide
                key={place._id}
                virtualIndex={index}
                className="pad-bottom relative w-full pb-1/2">
                <img
                  src={place.imagesUrl[1]}
                  alt={place.data[locale].name}
                  className="absolute h-full rounded-xl w-full object-cover"
                />
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl p-1 sm:p-2 bg-gray-900 rounded-xl bg-opacity-50 absolute top-5 left-5 text-white">
                  {place.data[locale].name}
                </h3>
                <p className="place_description text-sm p-1 sm:p-5 bg-gray-900 rounded-xl bg-opacity-50 absolute bottom-5 left-5 right-5 text-white">
                  {place.data[locale].description}
                </p>
                <button
                  className="text-white hover:bg-opacity-100 hover:text-opacity-70 focus:outline-none text-4xl sm:text-3xl md:text-2xl lg:text-xl p-2 bg-gray-900 rounded-xl bg-opacity-50 absolute top-5 right-5"
                  onClick={() => setIsFullscreen((isFullscreen) => !isFullscreen)}>
                  {isFullscreen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  )}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            loop
            lazy
            centeredSlides
            slideToClickedSlide
            spaceBetween={10}
            loopedSlides={6}
            onSwiper={setSecondSwiper}
            className="gallery-thumbs"
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            controller={{ control: firstSwiper }}>
            {places.map((place) => (
              <SwiperSlide key={place._id}>
                <img
                  src={place.imagesUrl[1]}
                  alt={place.data[locale].name}
                  className="rounded-xl w-full object-cover h-32"
                  onClick={() => callingRatingForms(place._id)}
                  role="presentation"
                />
                <div className="flex justify-center cursor-pointer">
                  <ReactStars
                    size={22}
                    count={5}
                    value={place.averageRating}
                    edit={false}
                    color="white"
                    activeColor="yellow"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
}
