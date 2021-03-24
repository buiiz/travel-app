import { motion } from 'framer-motion';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { initializeApollo } from '../../lib/apollo';
import { CurrentUserDocument } from '../../lib/graphql/currentUser.graphql';
import { useDeleteUserMutation } from '../../lib/graphql/deleteUser.graphql';
import { useAuth } from '../../lib/useAuth';

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

export default function User({ id }) {
  const { signOut } = useAuth();
  const [deleteUser] = useDeleteUserMutation();

  const [user, setUser] = useState({
    _id: '',
    name: '',
    email: '',
    avatar: '',
  });

  const signOutFunc = async () => {
    await signOut();
  };

  const fetchSetting = async () => {
    const apollo = initializeApollo();
    const { data } = await apollo.query({
      query: CurrentUserDocument,
      variables: { userId: id },
    });
    setUser(data.currentUser);
  };

  useEffect(() => {
    fetchSetting();
  }, []);

  const onDelete = async (e) => {
    e.preventDefault();

    try {
      const { data } = await deleteUser({
        variables: { userId: id },
      });
      if (data.deleteUser) {
        signOut();
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const { formatMessage: f } = useIntl();

  return (
    <div className="default-page">
      <div className="container">
        <Header />
        <div className="box">
          <Head>
            <title>User</title>
          </Head>
          <motion.div
            className="flex justify-center w-full max-w-lg"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={postVariants}>
            <div className="w-full max-w-lg">
              <div className="leading-loose">
                <Loader show={!user.name} />
                <div className="m-4 p-10 pb-5 bg-white bg-opacity-25 rounded shadow-xl">
                  <div className="flex items-center justify-around mb-10">
                    <div className="">
                      <img
                        className="h-20 w-20 rounded-full shadow__item"
                        src={user.avatar}
                        alt="avatar"
                      />
                    </div>
                    <div>
                      <h1 className="text-xl shadow__item text-white">{user.name}</h1>
                      <h1 className="text-xl shadow__item text-white">{user.email}</h1>
                    </div>
                  </div>
                  <div className="flex items-center justify-around">
                    <div
                      role="presentation"
                      onClick={signOutFunc}
                      className="text-white shadow__item cursor-pointer font-bold text-xl hover:text-gray-800">
                      {f({ id: 'signOut' })}
                    </div>
                    <div
                      role="presentation"
                      onClick={onDelete}
                      className="text-white shadow__item cursor-pointer font-bold text-xl hover:text-gray-800">
                      {f({ id: 'delete' })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

User.getInitialProps = ({ query: { id } }) => {
  return { id };
};
