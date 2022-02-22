import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const ArrowDownRightIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 9 9" fill="none">
      <path
        d="M8 2L8 8M8 8L2 8M8 8L2 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </SvgIcon>
  );
};
