import React from 'react';
import type { AppProps } from 'next/app';
import { Global, CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import { GlobalStyles } from 'twin.macro';

import GlobalCss from '~/styles/global';

import 'ress';

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <GlobalStyles />
      <Global styles={GlobalCss} />
      <CacheProvider value={cache}>
        <Component {...pageProps} />
      </CacheProvider>
    </>
  );
};

export default MyApp;
