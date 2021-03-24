import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div className="footer">
      <Link href="https://rs.school/react/">
        <a className="shadow__item hover__item" target="_blank">
          <Image src="/rs_school_logo.svg" alt="Logo" width={150} height={30} />
        </a>
      </Link>
      <h4 style={{ color: '#ffffff' }}>
        <span className="shadow__item">
          Created 2021:{' '}
          <Link href="https://github.com/alpoliakov">
            <a
              className="shadow__item hover__item hover:text-orange-600"
              style={{ color: '#ffffff' }}
              target="_blank">
              @alpoliakov
            </a>
          </Link>{' '}
          <Link href="https://github.com/buiiz">
            <a
              className="shadow__item hover__item hover:text-orange-600"
              style={{ color: '#ffffff' }}
              target="_blank">
              @buiiz
            </a>
          </Link>{' '}
          <Link href="https://github.com/ya-mashnenko">
            <a
              className="shadow__item hover__item hover:text-orange-600"
              style={{ color: '#ffffff' }}
              target="_blank">
              @ya-mashnenko
            </a>
          </Link>{' '}
          <Link href="https://github.com/w1r3d7/">
            <a
              className="shadow__item hover__item hover:text-orange-600"
              style={{ color: '#ffffff' }}
              target="_blank">
              @w1r3d7
            </a>
          </Link>
        </span>
      </h4>
    </div>
  );
}
