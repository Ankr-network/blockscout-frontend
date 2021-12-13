import React, { forwardRef, memo, ReactNode } from 'react';
import { SvgIcon, Theme, useTheme } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';
import { CSSProperties, makeStyles } from '@material-ui/styles';

export type IconSize =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'xmd'
  | 'lg'
  | 'xl'
  | number;

const styles: { [key in IconSize]: CSSProperties } = {
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
  root: ({ size = 'sm' }) =>
    ({
      ...(typeof size === 'number' ? { fontSize: size } : styles[size]),
    } as any),
}));

export interface ISvgIconProps extends SvgIconProps {
  size?: IconSize;
}

export const withSvgIcon = (element: ReactNode, extraProps?: SvgIconProps) => {
  return memo(
    forwardRef((props: ISvgIconProps, ref) => {
      const theme = useTheme();
      const { htmlColor = theme.palette.grey['700'], ...rest } = props;

      const classes = useStyles(props);

      return (
        <SvgIcon
          classes={{ root: classes.root }}
          htmlColor={htmlColor}
          innerRef={ref}
          {...extraProps}
          {...rest}
        >
          {element}
        </SvgIcon>
      );
    }),
  );
};
