import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import GlobalStyle from '~/styles/global';

import 'ress';

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
