import { withSvgIcon } from './withSvgIcon';

export const CompleteCircleIcon = withSvgIcon(
  <>
    <circle cx="16.5" cy="16.5" fill="#356DF3" r="16.5" />

    <path d="M9 17.5L13.5 22L24.5 11" stroke="white" strokeWidth="2" />
  </>,
  { viewBox: '0 0 33 33', htmlColor: 'transparent' },
);
