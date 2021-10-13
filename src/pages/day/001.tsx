import React from 'react';
import { NextPage } from 'next';
import { css } from '@emotion/react';
import tw from 'twin.macro';

import onDay001 from '~/day/001';

import Layout from '~/components/layout';

const MainCanvasStyle = css`
  ${tw`relative w-full`}
`;

const Day001Page: NextPage = () => {
  return (
    <Layout title="test">
      <canvas css={MainCanvasStyle} ref={onDay001} />
    </Layout>
  );
};

export default Day001Page;
