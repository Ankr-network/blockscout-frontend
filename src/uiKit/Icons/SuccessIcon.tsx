import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const SuccessIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 14 11" fill="none">
      <path
        d="M1 5L5 9L13 1"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </SvgIcon>
  );
};
