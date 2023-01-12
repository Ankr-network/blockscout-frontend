import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { ReactNode } from 'react';

import { useStakeFormStyles } from './useStakeFormStyles';

interface IStakeFormTitleProps {
  children: ReactNode;
  className?: string;
}

export const StakeFormTitle = ({
  children,
  className,
}: IStakeFormTitleProps): JSX.Element => {
  const classes = useStakeFormStyles();

  return (
    <Typography className={classNames(classes.title, className)} variant="h2">
      {children}
    </Typography>
  );
};
