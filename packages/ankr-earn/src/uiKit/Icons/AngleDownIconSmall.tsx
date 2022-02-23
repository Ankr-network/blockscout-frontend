import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const AngleDownIconSmall = (props: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon
      {...props}
      fill="none"
      height="7"
      viewBox="0 0 10 7"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L5 5L9 1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </SvgIcon>
  );
};
