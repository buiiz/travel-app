import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import setLanguage from 'next-translate/setLanguage';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { useAuth } from '../lib/useAuth';
import Dropdown from './Dropdown';
import Search from './Search';

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

export default function Header() {
  const { locale, locales } = useRouter();
  const [currentLocal, setCurrentLocal] = useState(locale);
  const { formatMessage: f } = useIntl();
  const router = useRouter();
  const { user, message, error } = useAuth();

  const showSearch = router.pathname === '/';

  const setLocal = ({ target }) => {
    setCurrentLocal(target.value);
  };

  useEffect(() => {
    setLanguage(currentLocal);
  }, [currentLocal]);

  return (
    <div className="header pb-5">
      <div className="header__home">
        <Link href="/">
          <a>
            <Image src="/images/logo.png" width="150px" height="80px" />
          </a>
        </Link>
      </div>
      <div className="header__search">
        {showSearch && (
          <motion.h1 initial="initial" animate="enter" exit="exit" variants={postVariants}>
            <Search />
          </motion.h1>
        )}
      </div>
      <div className="header__menu">
        <select
          className="select-css"
          onChange={setLocal}
          defaultValue={locale}
          data-testid="select-locale">
          {locales.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {user && <Dropdown />}
        {!user && (
          <>
            <Link href="/auth/login">
              <a className="text-white p-1 hover:bg-opacity-100 hover:text-opacity-70 text-base p-2 bg-gray-900 rounded-xl bg-opacity-50">
                {f({ id: 'btnLogin' })}
              </a>
            </Link>
            <Link href="/auth/signup">
              <a className="text-white p-1 hover:bg-opacity-100 hover:text-opacity-70 text-base p-2 bg-gray-900 rounded-xl bg-opacity-50">
                {f({ id: 'btnSignUp' })}
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
