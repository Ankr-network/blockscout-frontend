import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const ArrowTopIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20" fill="none">
      <path
        d="M10 3V18M10 3L17 10M10 3L3 10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
