import { withSvgIcon } from './withSvgIcon';

export const KebabIcon = withSvgIcon(
  <g fill="white">
    <circle cx="16" cy="5" fill="currentColor" r="3" />

    <circle cx="16" cy="16" fill="currentColor" r="3" />

    <circle cx="16" cy="27" fill="currentColor" r="3" />
  </g>,
  { viewBox: '0 0 32 32' },
);
