import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';

export const InformationIcon = (props: SvgIconProps) => {
  const { width, height } = props;
  return (
    <SvgIcon
      {...props}
      width={width || 20}
      height={height || 20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <circle cx="10" cy="10" r="10" fill="#F2F5FA" />
      <path
        d="M9.99144 6.54C9.6501 6.54 9.35144 6.41733 9.09544 6.172C8.8501 5.916 8.72744 5.61733 8.72744 5.276C8.72744 4.93467 8.8501 4.636 9.09544 4.38C9.35144 4.124 9.6501 3.996 9.99144 3.996C10.3434 3.996 10.6421 4.124 10.8874 4.38C11.1434 4.636 11.2714 4.93467 11.2714 5.276C11.2714 5.61733 11.1434 5.916 10.8874 6.172C10.6421 6.41733 10.3434 6.54 9.99144 6.54ZM8.96744 15.5V7.5H11.0314V15.5H8.96744Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
