import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const ArrowIcon = (props: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon
      {...props}
      fill="none"
      height="16"
      viewBox="0 0 20 16"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 8h18.5m0 0l-6-7m6 7l-6 7" stroke="#9AA1B0" strokeWidth="2" />
    </SvgIcon>
  );
};
