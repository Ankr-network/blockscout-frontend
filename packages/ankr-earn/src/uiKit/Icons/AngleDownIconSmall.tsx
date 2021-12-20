import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const AngleDownIconSmall = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      width="10"
      height="7"
      viewBox="0 0 10 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
      />
    </SvgIcon>
  );
};
