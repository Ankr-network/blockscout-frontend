import React from 'react';

import { withSvgIcon } from './withSvgIcon';

export const SwapIcon = withSvgIcon(
  <>
    <rect
      fill="white"
      height="34"
      rx="5"
      stroke="#F2F5FA"
      strokeWidth="2"
      width="34"
      x="1"
      y="1"
    />

    <path
      d="M8 18H26.5M26.5 18L20.5 11M26.5 18L20.5 25"
      stroke="#9AA1B0"
      strokeWidth="2"
    />
  </>,
  { viewBox: '0 0 36 36' },
);
