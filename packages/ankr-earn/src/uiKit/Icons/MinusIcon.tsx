import React from 'react';

import { withSvgIcon } from './withSvgIcon';

export const MinusIcon = withSvgIcon(
  <>
    <rect
      fill="currentColor"
      height="25"
      transform="rotate(-90 0 14)"
      width="3"
      y="14"
    />
  </>,
  { viewBox: '0 0 25 25' },
);
