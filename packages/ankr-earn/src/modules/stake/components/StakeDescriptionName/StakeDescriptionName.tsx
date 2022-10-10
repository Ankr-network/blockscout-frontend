import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { useStakeTermStyles } from './StakeDescriptionNameStyles';

type TColor =
  | 'initial'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'textSecondary'
  | 'error';

export interface IStakeDescriptionNameProps {
  children: ReactNode;
  className?: string;
  component?: React.ElementType;
  color?: TColor;
}

export const StakeDescriptionName = ({
  children,
  className,
  component = 'p',
  color,
}: IStakeDescriptionNameProps): JSX.Element => {
  const classes = useStakeTermStyles();

  return (
    <Typography
      className={classNames(className, classes.root)}
      color={color}
      component={component}
    >
      {children}
    </Typography>
  );
};
