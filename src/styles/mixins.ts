import { css } from 'styled-components';

export const media = {
  xs: (...args: any) => css`
    @media (min-width: 411px) {
      ${
        // @ts-ignore
        css(...args)
      };
    }
  `,
  sm: (...args: any) => css`
    @media (min-width: 640px) {
      ${
        // @ts-ignore
        css(...args)
      };
    }
  `,
  md: (...args: any) => css`
    @media (min-width: 768px) {
      ${
        // @ts-ignore
        css(...args)
      };
    }
  `,
  lg: (...args: any) => css`
    @media (min-width: 1024px) {
      ${
        // @ts-ignore
        css(...args)
      };
    }
  `,
  xl: (...args: any) => css`
    @media (min-width: 1280px) {
      ${
        // @ts-ignore
        css(...args)
      };
    }
  `,
  xl2: (...args: any) => css`
    @media (min-width: 1536px) {
      ${
        // @ts-ignore
        css(...args)
      };
    }
  `,
};
