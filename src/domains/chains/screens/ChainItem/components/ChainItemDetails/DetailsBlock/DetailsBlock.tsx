import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './useStyles';
import { DetailsBlockProps } from './DetailsBlockTypes';

export const DetailsBlock = ({
  title,
  subtitle,
  value,
  children,
  className = '',
}: DetailsBlockProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.top}>
        <Typography variant="subtitle1" color="textPrimary">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" color="textSecondary">
            {subtitle}
          </Typography>
        )}
      </div>
      <div className={classes.bottom}>
        <Typography variant="h3" className={classes.value}>
          {value}
        </Typography>
        {children}
      </div>
    </div>
  );
};
