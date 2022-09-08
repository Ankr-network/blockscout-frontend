import { makeStyles, SvgIcon, Theme, useTheme } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';
import {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  memo,
  MemoExoticComponent,
  ReactNode,
} from 'react';

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

const styles = {
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

const useStyles = makeStyles<Theme, ISvgIconProps>(() => ({
  root: ({ size = 'sm' }) => ({
    ...(typeof size === 'number' ? { fontSize: size } : styles[size]),
  }),
}));

export interface ISvgIconProps extends SvgIconProps {
  size?: IconSize;
}

export const withSvgIcon = (
  element: ReactNode,
  extraProps?: SvgIconProps,
): MemoExoticComponent<ForwardRefExoticComponent<ISvgIconProps>> => {
  return memo(
    forwardRef(
      (
        // False positive due to memo
        // eslint-disable-next-line react/prop-types
        { htmlColor, size, ...rest }: ISvgIconProps,
        ref: ForwardedRef<SVGSVGElement>,
      ) => {
        const theme = useTheme();
        const classes = useStyles({ size });

        return (
          <SvgIcon
            classes={{ root: classes.root }}
            htmlColor={htmlColor || theme.palette.grey['700']}
            innerRef={ref}
            {...(extraProps || {})}
            {...rest}
          >
            {element}
          </SvgIcon>
        );
      },
    ),
  );
};
