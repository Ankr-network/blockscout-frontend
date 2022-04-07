import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { useStakeTermStyles } from './StakeDescriptionNameStyles';

export interface IStakeDescriptionNameProps {
  children: ReactNode;
  className?: string;
}

export const StakeDescriptionName = ({
  children,
  className,
}: IStakeDescriptionNameProps): JSX.Element => {
  const classes = useStakeTermStyles();

  return (
    <Typography className={classNames(className, classes.root)}>
      {children}
    </Typography>
  );
};
