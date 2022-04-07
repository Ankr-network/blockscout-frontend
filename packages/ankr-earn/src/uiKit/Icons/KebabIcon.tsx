import { withSvgIcon } from './withSvgIcon';

export const KebabIcon = withSvgIcon(
  <g fill="white">
    <circle cx="16" cy="9" fill="currentColor" r="2" />

    <circle cx="16" cy="16" fill="currentColor" r="2" />

    <circle cx="16" cy="23" fill="currentColor" r="2" />
  </g>,
  { viewBox: '0 0 32 32' },
);
