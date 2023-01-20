import React from 'react';
import { Typography } from '@mui/material';

import { useStyles } from './useStyles';
import { ChainMainInfoProps } from './ChainRequestsLabelTypes';

export const ChainRequestsLabel = ({
  className = '',
  description,
  descriptionClassName,
  descriptionColor = 'textPrimary',
  label,
}: ChainMainInfoProps) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Typography
        className={cx(descriptionClassName, classes.subtitle)}
        color={descriptionColor}
        noWrap
        variant="subtitle2"
      >
        {description?.toUpperCase()}
      </Typography>
      {label && (
        <Typography
          className={classes.label}
          variant="caption"
          color="textSecondary"
        >
          {label}
        </Typography>
      )}
    </div>
  );
};
