import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const ArrowTopRightIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 9 9" fill="none">
      <path
        d="M2 1H8M8 1V7M8 1L2 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </SvgIcon>
  );
};
