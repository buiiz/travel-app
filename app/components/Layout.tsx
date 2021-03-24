import Head from 'next/head';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import ToasterLayout from './ToasterLayout';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <ToasterLayout />
      <Toaster />
      {children}
    </>
  );
}
