import React from 'react';

import { withSvgIcon } from './withSvgIcon';

export const PlusIcon = withSvgIcon(
  <>
    <rect fill="currentColor" fillRule="evenodd" height="25" width="3" x="11" />

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
