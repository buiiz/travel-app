import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';

import { REG_EMAIL } from '../constants';
import { useEditUserMutation } from '../lib/graphql/editUser.graphql';
import { useAuth } from '../lib/useAuth';
import imageUpload from '../utils/imageUpload';
import Loader from './Loader';

export default function SettingsForm() {
  const [loading, setLoading] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const { user, error } = useAuth();

  const [editUser] = useEditUserMutation();

  const router = useRouter();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    avatar: '',
  });

  useEffect(() => {
    setUserData(user);
  }, [user]);

  // console.log(userData);

  const { formatMessage: f } = useIntl();

  const onLoadAvatar = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return toast.error('File doesn`t exist.');
    }

    if (file.size > 1024 * 2048) {
      return toast.error('The largest image size is 1mb!');
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
      return toast.error('Image format is incorrect!');
    }

    setUserData({ ...userData, avatar: file });
  };

  const validation = async ({ name, email }) => {
    let result = false;

    if (!name || name.length < 3) {
      await setErrorName(true);
      result = true;
    }

    if (!email || !email.match(REG_EMAIL)) {
      await setValidEmail(true);
      result = true;
    } else {
      await setValidEmail(false);
    }

    return result;
  };

  const onFinish = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email } = userData;
    let { avatar } = userData;

    const valid = await validation(userData);

    if (typeof avatar !== 'string') {
      avatar = await imageUpload([avatar]);
    }

    if (!avatar) {
      avatar = '/images/hacker.png';
    }

    if (valid) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await editUser({
        variables: { input: { name, email, avatar } },
      });

      if (data.editUser._id) {
        router.back();
        toast.success('Profile changed successfully.');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }

    if (error) {
      setLoading(false);
    }
  }, [user, error]);

  if (!userData) {
    return <Loader show />;
  }

  return (
    <div className="w-full max-w-lg">
      {loading && <Loader show={loading} />}
      <div className="leading-loose">
        <form className="m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
          <p className="text-white font-medium text-center text-lg font-bold uppercase">
            {f({ id: 'settings' })}
          </p>
          <div className="">
            <label className="block text-sm text-white" htmlFor="name">
              {f({ id: 'changeName' })}
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="name"
              id="name"
              value={userData.name}
              placeholder={f({ id: 'phName' })}
              aria-label="name"
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });

                if (userData.name.length > 2) {
                  setErrorName(false);
                }
              }}
              required
            />
            <span className="flex items-center font-medium tracking-wide text-yellow-500 text-xs mt-1 ml-1">
              {errorName && f({ id: 'errorName' })}
            </span>
          </div>
          <div className="mt-1">
            <label className="block text-sm text-white" htmlFor="email">
              {f({ id: 'changeEmail' })}
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
          <div className="mt-4 flex justify-between align-center">
            <label className="block text-sm text-white" htmlFor="avatar">
              {f({ id: 'avatar' })}
              <div className="w-full cursor-pointer tracking-wide px-5 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white">
                <input
                  className="hidden"
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={onLoadAvatar}
                  name="file"
                  placeholder={f({ id: 'phAvatar' })}
                  arial-label="loader"
                />
                <span className="mt-2 text-base leading-normal">{f({ id: 'selectFile' })}</span>
              </div>
            </label>
            <div className="mr-3">
              <img
                className="h-20 w-20 rounded-full"
                src={
                  typeof userData.avatar === 'string'
                    ? userData.avatar
                    : URL.createObjectURL(userData.avatar)
                }
                alt="avatar"
              />
            </div>
          </div>

          <div className="mt-8 items-center flex justify-between">
            <button
              className="px-4 py-1 text-white font-bold tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
              type="submit"
              onClick={onFinish}>
              {f({ id: 'save' })}
            </button>
            <div
              className="inline-block cursor-pointer right-0 align-baseline font-bold text-sm text-500 text-white hover:text-blue-800"
              role="presentation"
              onClick={() => router.back()}>
              {f({ id: 'or' })} {f({ id: 'return' })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
