import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const CopyIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16" fill="none">
      <rect
        x="1.835"
        y="1.835"
        width="9.33"
        height="9.33"
        rx="2.665"
        fill="#fff"
        stroke="currentColor"
        strokeWidth="1.67"
      />
      <rect
        x="4.835"
        y="4.835"
        width="9.33"
        height="9.33"
        rx="2.665"
        fill="#fff"
        stroke="currentColor"
        strokeWidth="1.67"
      />
    </SvgIcon>
  );
};
