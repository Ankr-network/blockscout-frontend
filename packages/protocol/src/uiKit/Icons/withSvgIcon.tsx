import {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  memo,
  MemoExoticComponent,
  ReactNode,
  useMemo,
} from 'react';
import { SvgIcon, SvgIconProps, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

export type IconSize =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'xmd'
  | 'lg'
  | 'xl'
  | 'inherit'
  | number;

export interface ISvgIconProps extends SvgIconProps {
  // eslint-disable-next-line react/no-unused-prop-types
  size?: IconSize;
}

const EMPTY_SX: SxProps<Theme> = {};

const sizeStyles: Partial<
  Record<IconSize, { fontSize: string | number | undefined }>
> = {
  inherit: {
    fontSize: 'inherit',
  },
  xxs: {
    fontSize: 12,
  },
  xs: {
    fontSize: 16,
  },
  sm: {
    fontSize: 24,
  },
  md: {
    fontSize: 32,
  },
  xmd: {
    fontSize: 48,
  },
  lg: {
    fontSize: 64,
  },
  xl: {
    fontSize: 88,
  },
};

export const withSvgIcon = (
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
        const styles: SxProps<Theme> = useMemo(() => {
          if (!size) {
            return {};
          }

          return (size && sizeStyles[size]) || size;
        }, [size]);

        const propsSx = props?.sx || EMPTY_SX;
        const extraPropsSx = extraProps?.sx || EMPTY_SX;

        return (
          <SvgIcon
            ref={ref}
            htmlColor={htmlColor || theme.palette.grey['700']}
            {...(extraProps || {})}
            {...props}
            sx={[
              styles,
              ...(Array.isArray(extraPropsSx) ? extraPropsSx : [extraPropsSx]),
              ...(Array.isArray(propsSx) ? propsSx : [propsSx]),
            ]}
          >
            {element}
          </SvgIcon>
        );
      },
    ),
  );
};
