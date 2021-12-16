import React from 'react';
import { withSvgIcon } from './withSvgIcon';

export const MinusIcon = withSvgIcon(
  <>
    <rect y="14" width="3" height="25" transform="rotate(-90 0 14)" />
  </>,
  { viewBox: '0 0 25 25' },
);
