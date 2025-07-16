import { Global, css } from '@emotion/react';
import { starAnimation } from '../../animationStyles';

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          outline: 0;
          box-sizing: border-box;
          border: 0;
          outline: unset;
          list-style: none;
          font-style: normal;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        html,
        body {
          overflow-x: hidden;
        }

        label {
          cursor: pointer;
          background-color: transparent;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        textarea {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        .animate-star {
          ${starAnimation}
        }
      `}
    />
  );
};
