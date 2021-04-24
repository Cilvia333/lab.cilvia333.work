import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyle = createGlobalStyle`
  body {
    ${tw`relative text-black text-base 2xl:py-48px lg:py-24px py-48px px-80px md:px-48px xs:px-24px px-16px`}
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
