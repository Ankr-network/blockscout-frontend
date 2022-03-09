import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const AngleDownIcon = (props: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon {...props} fill="none" viewBox="0 0 10 6">
      <path d="M1 1L5 5L9 1" fill="none" stroke="currentColor" />
    </SvgIcon>
  );
};
