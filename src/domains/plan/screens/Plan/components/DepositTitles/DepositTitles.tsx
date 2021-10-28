import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { Typography } from '@material-ui/core';

import { useStyles } from './useStyles';

interface DepositTitlesProps {
  className?: string;
  topTitle: ReactNode;
  bottomTitle: ReactNode;
  isBottomTitleFullWidth?: boolean;
}

export const DepositTitles = ({
  className,
  topTitle,
  bottomTitle,
  isBottomTitleFullWidth,
}: DepositTitlesProps) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <Typography variant="h4" className={classes.topTitle} color="primary">
        {topTitle}
      </Typography>
      <Typography
        variant="h2"
        className={classnames(
          classes.bottomTitle,
          isBottomTitleFullWidth && classes.fullWidth,
        )}
      >
        {bottomTitle}
      </Typography>
    </div>
  );
};
