import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const StatIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16" fill="none">
      <rect
        x="1.5"
        y="7.5"
        width="2.5"
        height="5"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <rect
        x="12"
        y="3.5"
        width="2.5"
        height="9"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <rect
        x="6.75"
        y="5.5"
        width="2.5"
        height="7"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </SvgIcon>
  );
};
