import {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  memo,
  MemoExoticComponent,
  ReactNode,
} from 'react';
import { SvgIcon, SvgIconProps, useTheme } from '@mui/material';

import { ISvgIconProps } from './withSvgIcon';

export const withSvgIconSimple = (
  element: ReactNode,
  extraProps?: SvgIconProps,
): MemoExoticComponent<ForwardRefExoticComponent<ISvgIconProps>> => {
  return memo(
    forwardRef(
      (
        { htmlColor, size, ...props }: ISvgIconProps,
        ref: ForwardedRef<SVGSVGElement>,
      ) => {
        const theme = useTheme();

        return (
          <SvgIcon
            ref={ref}
            htmlColor={htmlColor || theme.palette.grey['700']}
            {...(extraProps || {})}
            {...props}
          >
            {element}
          </SvgIcon>
        );
      },
    ),
  );
};
