import { css } from '@emotion/react';
import tw from 'twin.macro';

const GlobalStyle = css`
  body {
    ${tw`relative text-black text-base`}
    font-feature-settings: 'pkna';
    min-height: 100vh;
  }

  li {
    list-style: none;
  }

  a {
    ${tw`no-underline`}
  }
`;

export default GlobalStyle;
