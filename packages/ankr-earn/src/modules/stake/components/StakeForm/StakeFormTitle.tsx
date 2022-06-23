import { Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import { useStakeFormStyles } from './useStakeFormStyles';

interface IStakeFormTitleProps {
  children: ReactNode;
}

export const StakeFormTitle = ({
  children,
}: IStakeFormTitleProps): JSX.Element => {
  const classes = useStakeFormStyles();

  return (
    <Typography className={classes.title} variant="h2">
      {children}
    </Typography>
  );
};
