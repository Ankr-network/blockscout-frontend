import React from 'react';
import { withSvgIcon } from './withSvgIcon';

export const SwapIcon = withSvgIcon(
  <>
    <rect
      x="1"
      y="1"
      width="34"
      height="34"
      rx="5"
      fill="white"
      stroke="#F2F5FA"
      strokeWidth="2"
    />
    <path
      d="M8 18H26.5M26.5 18L20.5 11M26.5 18L20.5 25"
      stroke="#9AA1B0"
      strokeWidth="2"
    />
  </>,
  { viewBox: '0 0 36 36' },
);
