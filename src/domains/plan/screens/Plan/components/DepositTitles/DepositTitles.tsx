import React, { ReactNode } from 'react';
import { Typography } from '@material-ui/core';

import { useStyles } from './useStyles';

interface DepositTitlesProps {
  className?: string;
  topTitle: ReactNode;
  bottomTitle: ReactNode;
}

export const DepositTitles = ({
  className,
  topTitle,
  bottomTitle,
}: DepositTitlesProps) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <Typography variant="h4" className={classes.topTitle} color="primary">
        {topTitle}
      </Typography>
      <Typography variant="h1" className={classes.bottomTitle}>
        {bottomTitle}
      </Typography>
    </div>
  );
};
