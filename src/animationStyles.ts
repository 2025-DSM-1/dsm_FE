import { keyframes, css } from '@emotion/react';

export const popStar = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.15);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
`;

export const starAnimation = css`
  animation: ${popStar} 0.35s ease;
`;
