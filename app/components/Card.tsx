import { useRouter } from 'next/router';
import React from 'react';

import { getRandomImg } from '../utils/utils';

export default function Card({ item }) {
  const { _id, data, imagesUrl } = item;
  const randomImgArr = getRandomImg(imagesUrl);

  const router = useRouter();
  const { locale } = useRouter();

  const goToCountryPage = () => {
    router.push(`/countries/${_id}`);
  };

  return (
    <div
      className="card hover__item shadow__item p-3"
      role="presentation"
      onClick={goToCountryPage}
      data-id={_id}
      style={{
        backgroundImage: `url(${randomImgArr[0]}), linear-gradient(var(--color-grey-light) 1%, var(--color-grey-dark) 100%)`,
      }}>
      <h1
        className="shadow__item gradient-text text-2xl sm:text-3xl md:text-4xl font-semibold"
        data-id={_id}
        style={{ zIndex: -1 }}>
        {data[locale].name}
      </h1>
      <h1
        className="shadow__item lowercase gradient-text text-xl font-semibold md:text-2xl"
        data-id={_id}
        style={{ color: '#ffffff', zIndex: -1 }}>
        {data[locale].capital}
      </h1>
    </div>
  );
}
