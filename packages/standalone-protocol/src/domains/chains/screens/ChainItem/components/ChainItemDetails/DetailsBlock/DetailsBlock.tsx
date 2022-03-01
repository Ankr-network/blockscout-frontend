import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './useStyles';
import { DetailsBlockProps } from './DetailsBlockTypes';
import { Skeleton } from '@material-ui/lab';

export const DetailsBlock = ({
  title,
  value,
  description,
  loading,
  className = '',
}: DetailsBlockProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.top}>
        <Typography variant="body1" color="textPrimary" noWrap>
          {title}
        </Typography>
      </div>
      {loading ? (
        <Skeleton className={classes.skeleton} height="37.3px" />
      ) : (
        <Typography variant="h2" className={classes.value} color="textPrimary">
          {value}
        </Typography>
      )}
      <Typography variant="subtitle1" className={classes.description}>
        {description}
      </Typography>
    </div>
  );
};
