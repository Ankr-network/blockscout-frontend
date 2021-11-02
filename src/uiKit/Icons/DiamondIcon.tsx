import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const DiamondIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 16 13">
      <path
        d="M8 12L14.5 5M8 12L1.5 5M8 12L10.75 5M8 12L5.25 5M14.5 5L12.4039 2.16006C12.3455 2.08101 12.3163 2.04149 12.2756 2.01619C12.235 1.99089 12.1866 1.98221 12.0899 1.96485L9.5 1.5M14.5 5H10.75M1.5 5L3.59614 2.16006C3.65449 2.08101 3.68367 2.04149 3.72435 2.01619C3.76504 1.99089 3.81339 1.98221 3.9101 1.96485L6.5 1.5M1.5 5H5.25M10.75 5L9.5 1.5M10.75 5H5.25M9.5 1.5H6.5M5.25 5L6.5 1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
