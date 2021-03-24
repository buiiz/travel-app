import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { REG_EMAIL } from '../constants';
import { useAuth } from '../lib/useAuth';
import Loader from './Loader';

export default function LoginForm() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorPsw, setErrorPsw] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const { signIn, user, error } = useAuth();

  const { formatMessage: f } = useIntl();

  const onFinish = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = userData;

    if (password.length < 6) {
      setErrorPsw(true);
    }

    if (email.match(REG_EMAIL)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }

    signIn(email, password);
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
      router.back();
    }

    if (error) {
      setLoading(false);
    }
  }, [user, error]);

  return (
    <div className="w-full max-w-lg">
      <div className="leading-loose">
        <Loader show={loading} />
        <form className="m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
          <p className="text-white font-medium text-center text-lg font-bold uppercase">
            {f({ id: 'btnLogin' })}
          </p>
          <div className="">
            <label className="block text-sm text-white" htmlFor="email">
              E-mail:
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="email"
              id="email"
              value={userData.email}
              placeholder={f({ id: 'phEmail' })}
              aria-label="email"
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
            />
            <span className="flex items-center font-medium tracking-wide text-yellow-500 text-xs mt-1 ml-1">
              {validEmail && f({ id: 'errorEmail' })}
            </span>
          </div>
          <div className="mt-4">
            <label className="block  text-sm text-white" htmlFor="password">
              {f({ id: 'pass' })}
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="password"
              id="password"
              value={userData.password}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
                if (userData.password.length > 5) {
                  setErrorPsw(false);
                }
              }}
              name="password"
              placeholder={f({ id: 'phPass' })}
              arial-label="password"
              required
            />
            <span className="flex items-center font-medium tracking-wide text-yellow-500 text-xs mt-1 ml-1">
              {errorPsw && f({ id: 'errorPass' })}
            </span>
          </div>

          <div className="mt-8 items-center flex justify-between">
            <button
              className="px-4 py-1 text-white font-bold tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
              type="submit"
              onClick={onFinish}>
              {f({ id: 'enter' })}
            </button>
            <p
              className="inline-block cursor-pointer right-0 align-baseline font-bold text-sm text-500 text-white hover:text-blue-800"
              role="presentation"
              onClick={() => router.back()}>
              {f({ id: 'return' })}
            </p>
          </div>
          <div className="text-center">
            <Link href="/auth/signup">
              <a className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-blue-800">
                {f({ id: 'createAcc' })}
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
