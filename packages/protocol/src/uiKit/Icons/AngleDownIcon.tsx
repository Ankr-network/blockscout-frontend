import { SvgIcon, SvgIconProps } from '@mui/material';

export const AngleDownIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M14 9L10 13L6 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
