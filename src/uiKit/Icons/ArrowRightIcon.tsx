import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const ArrowRightIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 10 10" fill="none">
      <path
        d="M5 9L9 5M9 5L5 1M9 5L-1.74846e-07 5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </SvgIcon>
  );
};
