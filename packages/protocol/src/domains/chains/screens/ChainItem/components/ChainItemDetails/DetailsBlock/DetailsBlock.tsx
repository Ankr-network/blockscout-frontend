import React from 'react';
import { Box, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './useStyles';
import { DetailsBlockProps } from './DetailsBlockTypes';
import { Skeleton } from '@material-ui/lab';
import { StatusCircle } from 'uiKit/StatusCircle/StatusCircle';

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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={classes.top}
      >
        {hasDot && <StatusCircle mr={1.25} />}
        <Typography variant="subtitle1" color="textPrimary" noWrap>
          {title}
        </Typography>
      </Box>
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
