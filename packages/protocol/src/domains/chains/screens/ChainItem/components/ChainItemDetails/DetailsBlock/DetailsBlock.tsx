import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './useStyles';
import { DetailsBlockProps } from './DetailsBlockTypes';
import { Skeleton } from '@material-ui/lab';

export const DetailsBlock = ({
  title,
  value,
  children,
  loading,
  hasDot,
  className = '',
}: DetailsBlockProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.top}>
        <Typography variant="subtitle1" color="textPrimary" noWrap>
          <span className={hasDot ? classes.dot : ''}>{title}</span>
        </Typography>
      </div>
      {loading ? (
        <Skeleton className={classes.skeleton} />
      ) : (
        <Typography variant="h3" className={classes.value}>
          {value}
        </Typography>
      )}
      {children}
    </div>
  );
};
