import Link from 'next/link';
import React from 'react';
import { useIntl } from 'react-intl';

import { useAuth } from '../lib/useAuth';

export default function Dropdown() {
  const { user, signOut } = useAuth();
  const { formatMessage: f } = useIntl();
  const img =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  const logOut = () => {
    signOut();
  };

  return (
    <div className="dropdown cursor-pointer p-1 mr-2 flex items-center">
      <div className="mr-3">
        <img className="h-10 w-10 rounded-full" src={user.avatar} alt="avatar" />
      </div>
      <div className="">
        <span className="text-white text-lg font-semibold ml-1">{user.name}</span>
      </div>
      <div className="rounded-md shadow-sm flex">
        <button className="flex justify-center items-center block h-3 w-3 overflow-hidden focus:outline-none">
          <div
            id="arrow"
            className="animate-ping inline-flex h-full w-full rounded-full text-gray-700 opacity-75">
            <svg
              className="h-3 w-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
        <ul className="dropdown-menu absolute w-48 bg-white rounded-lg shadow-xl mt-8 -ml-48 hidden sm:mr-24 md:mr-32 lg:mr-48 xl:mr-64s">
          <li className="">
            <Link href={`/user/${user._id}`}>
              <a className="rounded-t text-gray-800 hover:bg-gray-600 hover:text-white py-2 px-4 block whitespace-no-wrap">
                {f({ id: 'profile' })}
              </a>
            </Link>
          </li>
          <li className="">
            <Link href={`/user/settings/`}>
              <a className="text-gray-800 hover:bg-gray-600 hover:text-white py-2 px-4 block whitespace-no-wrap">
                {f({ id: 'settings' })}
              </a>
            </Link>
          </li>
          <li className="">
            <div
              className="rounded-b text-gray-800 hover:bg-gray-600 hover:text-white py-2 px-4 block whitespace-no-wrap"
              onClick={logOut}
              role="presentation">
              {f({ id: 'signOut' })}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
