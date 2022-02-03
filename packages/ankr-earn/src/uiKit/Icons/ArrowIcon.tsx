import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const ArrowIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      width="20"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 16"
    >
      <path d="M0 8h18.5m0 0l-6-7m6 7l-6 7" stroke="#9AA1B0" strokeWidth="2" />
    </SvgIcon>
  );
};
